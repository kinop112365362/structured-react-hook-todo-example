import data from "../mock/todo-data.json";

export const getTodolist = () =>
  new Promise((resolve) => {
    resolve(data);
  });
