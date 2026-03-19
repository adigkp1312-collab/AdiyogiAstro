import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const awsConfig = {
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};

// Bedrock client for AI chatbot
export const bedrockClient = new BedrockRuntimeClient(awsConfig);

// DynamoDB client
const dynamoClient = new DynamoDBClient(awsConfig);
export const docClient = DynamoDBDocumentClient.from(dynamoClient);

// Table names
export const TABLES = {
  USERS: process.env.DYNAMODB_TABLE_USERS || "astropath-users",
  CHATS: process.env.DYNAMODB_TABLE_CHATS || "astropath-chats",
  KUNDLI: process.env.DYNAMODB_TABLE_KUNDLI || "astropath-kundli",
};
