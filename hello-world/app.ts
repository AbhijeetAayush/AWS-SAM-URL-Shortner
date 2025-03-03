import { APIGatewayEvent, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME as string;

export const lambdaHandler = async (event: APIGatewayEvent, context: Context) => {
  console.log("Incoming Event:", JSON.stringify(event));
  console.log("Context Information:", JSON.stringify(context));

  try {
    if (event.httpMethod === "POST" && event.path === "/shorten") {
      console.log("POST /shorten request received");

      const body = JSON.parse(event.body || "{}");
      const longUrl = body.url;

      if (!longUrl) {
        console.log("Validation Error: URL is missing");
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "URL is required" }),
        };
      }

      const shortUrl = uuidv4().substring(0, 6);
      console.log(`Generated Short URL: ${shortUrl}`);

      await dynamoDb.send(
        new PutCommand({
          TableName: tableName,
          Item: { shortUrl: shortUrl, longUrl: longUrl },
        })
      );
      console.log("URL saved to DynamoDB");

      return {
        statusCode: 200,
        body: JSON.stringify({ shortUrl: `${event.headers?.Host}/${event.requestContext.stage}/${shortUrl}` }),
      };
    }

    if (event.httpMethod === "GET" && event.pathParameters?.shortUrl) {
      console.log("GET request received");

      const shortUrl = event.pathParameters.shortUrl;
      console.log(`Fetching URL for Short URL: ${shortUrl}`);
      const result = await dynamoDb.send(
        new GetCommand({
          TableName: tableName,
          Key: { shortUrl: shortUrl },
        })
      );
      console.log(result);

      if (!result.Item) {
        console.log("URL not found in DynamoDB");
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "URL not found" }),
        };
      }
      console.log(`URL Found: ${result.Item.longUrl}`);

      return {
        statusCode: 302,
        headers: { Location: result.Item.longUrl },
        body: "",
      };
    }

    console.log("Invalid HTTP Method");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request" }),
    };
  } catch (error) {
    console.error("Internal Server Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
