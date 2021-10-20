import type { AWS } from "@serverless/typescript";

import addTodoH from "@functions/addTodo";
import fetchTodosH from "@functions/fetchTodos";
import deleteTodoH from "@functions/deleteTodo";
import updateTodoH from "@functions/updateTodo";
import fetchTodoH from "@functions/fetchTodo";

const serverlessConfiguration: AWS = {
  service: "serverlessappswithts",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    stage: "dev",
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    region: "eu-west-2",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["arn:aws:dynamodb:eu-west-2:218767131295:table/TodoTableTS"],
      },
    ],
  },
  resources: {
    Resources: {
      TodoTableTS: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "TodoTableTS",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },
  // import the function via paths
  functions: {
    addTodoH,
    fetchTodosH,
    deleteTodoH,
    updateTodoH,
    fetchTodoH,
  },
};

module.exports = serverlessConfiguration;
