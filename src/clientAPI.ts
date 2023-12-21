import axios, { AxiosResponse } from "axios";

import { ITodo } from "./types";

const url = "http://localhost:8080/todos";

export const getTodos = async (): Promise<ITodo[]> => {
  try {
    const { data: todosRespo } = await axios.get(url);

    return todosRespo?.data;
  } catch (error) {
    throw new Error("Failed to fetch todos.");
  }
};

export const addTodo = async (todo: Omit<ITodo, "id">): Promise<ITodo> => {
  try {
    const { data: addedTodoResp } = await axios.post(url, todo);

    return addedTodoResp?.data;
  } catch (error) {
    throw new Error("Failed to create the todo.");
  }
};

export const updateTodo = async (todo: ITodo): Promise<ITodo> => {
  try {
    const { data: updatedTodoResp } = await axios.put(
      `${url}/${todo.id}`,
      todo
    );

    return updatedTodoResp.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update the todo.");
  }
};

export const deleteTodo = async (id: string): Promise<string> => {
  try {
    await axios.delete(`${url}/${id}`);

    return id;
  } catch (error) {
    throw new Error("Failed to delete the todo.");
  }
};

export default {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
