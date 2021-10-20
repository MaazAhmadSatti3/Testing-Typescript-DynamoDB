const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const writeTodo = async (newTodo) => {
  const data = await dynamodb
    .put({
      TableName: "TodoTableTS",
      Item: newTodo,
    })
    .promise();

  return data;
};

export const fetchTodos = async () => {
  const params = {
    TableName: "TodoTableTS",
  };

  const data = await dynamodb.scan(params).promise();

  if (!data) {
    throw Error(`No Data In`);
  }

  return data;
};

export const deleteTodo = async (id) => {
  const params = {
    TableName: "TodoTableTS",
    Key: {
      id,
    },
  };

  const data = await dynamodb.delete(params).promise();

  if (!data) {
    throw Error(`Invalid Id ${id}`);
  }

  return data;
};

export const updateTodo = async (newTodo) => {
  const params = {
    TableName: "TodoTableTS",
    Key: {
      id: newTodo.id,
    },
    UpdateExpression: "set todo = :anything",
    ExpressionAttributeValues: {
      ":anything": newTodo.todo,
    },
  };

  const data = await dynamodb.update(params).promise();

  return data;
};

export const fetchTodo = async (id) => {
  const params = {
    TableName: "TodoTableTS",
    Key: {
      id,
    },
  };
  const data = await dynamodb.get(params).promise();

  return data;
};
