// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";
import { fetchTodo } from "../../common/dynamodb";
// import schema from "@functions/fetchTodo/schema";

export const fetchTodoH: Handler = async (event) => {
  const { id }: any = event.body;

  let user = await fetchTodo(id).catch((err) => {
    console.log("error in Dynamo Get", err);

    return null;
  });

  return formatJSONResponse({
    statusCode: 200,
    body: JSON.stringify(user),
  });
};
export const main = middyfy(fetchTodoH);
