// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
const { v4 } = require("uuid");
import { middyfy } from "@libs/lambda";
import { writeTodo } from "../../common/dynamodb";
// import schema from "@functions/addTodo/schema";
import { Handler } from "aws-lambda";

export const addTodoH: Handler = async (event) => {
  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  const respone = writeTodo(newTodo);

  try {
    return formatJSONResponse({
      statusCode: 200,
      body: respone,
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 400,
      body: error,
    });
  }
};
export const main = middyfy(addTodoH);
