import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { updateTodo } from "src/common/dynamodb";
import schema from "@functions/updateTodo/schema";

const updateTodoH: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { id } = event.body;
  const { todo } = event.body;

  const newTodo1 = {
    id,
    todo,
  };

  const response = updateTodo(newTodo1);

  return formatJSONResponse({
    statusCode: 200,
    body: newTodo1,
  });
  
};
export const main = middyfy(updateTodoH);
