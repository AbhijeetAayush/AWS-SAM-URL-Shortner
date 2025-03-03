# 🚀 URL Shortener using AWS Lambda, API Gateway & DynamoDB

This project is a **URL Shortener** built using **AWS Lambda**, **API Gateway**, **DynamoDB**, and **TypeScript**. The system allows users to shorten long URLs and access them via a short URL.

## 📌 Features
- URL Shortening
- URL Redirection
- DynamoDB Integration
- Error Handling
- API Gateway Deployment
- UUID-based URL Generation
- Thunder Client Testing 💪

## 🛠️ Tech Stack
- AWS Lambda
- API Gateway
- DynamoDB
- TypeScript
- AWS SDK v3
- Thunder Client (for testing)

---

## 🔑 Prerequisites
- Node.js installed
- AWS Account with programmatic access
- AWS CLI configured
- DynamoDB table created
- API Gateway set up

### DynamoDB Table Configuration
| Attribute Name | Type   |
|---------------|--------|
| shortUrl      | String |
| longUrl       | String |

---

## 📄 Project Structure
```
├── src
│   └── handler.ts     # Lambda Function Code
├── package.json       # Dependencies
└── tsconfig.json      # TypeScript Configuration
```

---

## ⚙️ Setup & Installation
### Clone Repository
```bash
git clone https://github.com/AbhijeetAayush/Url-Shortener-AWS
cd Url-Shortener-AWS
```

### Install Dependencies
```bash
npm install
```

### Build Project
```bash
npm run build
```

### Deploy to AWS
1. Zip the folder
```bash
zip -r lambda.zip .
```
2. Upload to AWS Lambda
3. Set **Environment Variable**:
   - `TABLE_NAME`: Your DynamoDB table name

---

## 🔥 API Endpoints

### 1. Shorten URL
**Endpoint:**
```
POST /shorten
```
**Request Body:**
```json
{
  "url": "https://example.com"
}
```
**Response:**
```json
{
  "shortUrl": "https://{api-gateway-url}/{stage}/abc123"
}
```
---

### 2. Redirect URL
**Endpoint:**
```
GET /{shortUrl}
```
**Response:**
302 Redirect to the original URL

---

## 🎯 Testing with Thunder Client
1. Install **Thunder Client** extension in VSCode
2. Use the **POST** request with the request body to shorten URLs.
3. Use the **GET** request with the shortened URL to test redirection.

---

## 💪 Error Responses
| Status Code | Message              |
|-------------|---------------------|
| 400         | URL is required     |
| 404         | URL not found      |
| 500         | Internal Server Error |

---

## 📌 Environment Variables
| Name       | Description           |
|------------|---------------------|
| TABLE_NAME | DynamoDB Table Name |

---

## 📌 Logs
To view the logs, navigate to **AWS CloudWatch Logs** and select the corresponding Lambda function.

---

## 💡 Conclusion
This project demonstrates how to build a **serverless URL shortener** with **AWS Lambda, API Gateway, and DynamoDB** using TypeScript.

---

## 📌 Author
Teja Boreddy

---

✅ Happy Coding!

