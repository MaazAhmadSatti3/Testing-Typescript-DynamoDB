import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { fetchTodos } from "../../common/dynamodb";

const fetchTodosH = async () => {
  let user = await fetchTodos().catch((err) => {
    console.log("error in Dynamo Get", err);

    return null;
  });

  if (!user) {
    return formatJSONResponse({ message: "Failed to get user by ID" });
  }

  return formatJSONResponse({ message: user });
};

export const main = middyfy(fetchTodosH);
