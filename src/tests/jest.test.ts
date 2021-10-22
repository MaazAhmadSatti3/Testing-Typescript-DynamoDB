import { addTodoH } from "@functions/addTodo/handler";
import { deleteTodoH } from "@functions/deleteTodo/handler";
import { fetchTodoH } from "@functions/fetchTodo/handler";

var result: any;

describe("checking delete method", () => {
  const id = {
    body: {
      id: "bbb4e093-3ac3-4f5c-9458-dd310029bd24",
    },
  };

  it("This should check data is deleted or not", async () => {
    result = await deleteTodoH(id, null, null);
    expect(result.statusCode).toBe(200);
  });
  it("Body to be string", () => {
    expect(typeof result.body).toBe("string");
  });
  it("After parsing body should be an object", () => {
    let parsed = JSON.parse(result.body);
    expect(typeof parsed).toBe("object");
  });
});

describe("Checking addTodo Method", () => {
  const todo = {
    body: {
      todo: "Do something",
    },
  };

  it("This should check todo is added or not", async () => {
    result = await addTodoH(todo, null, null);
    expect(result.statusCode).toBe(200);
  });
});

describe("Checking fetch todo", () => {
  const id = {
    body: {
      id: "bbb4e093-3ac3-4f5c-9458-dd310029bd24",
    },
  };

  it("This should check is data is fetching", async () => {
    result = await fetchTodoH(id, null, null);
    expect(result.statusCode).toBe(200);
  });
});
