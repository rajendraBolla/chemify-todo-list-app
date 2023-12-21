import React, { useState, useEffect } from "react";

import {
  Container,
  Stack,
  Title,
  Notification,
  Loader,
  Text,
} from "@mantine/core";

import clientAPI from "../clientAPI";
import { ITodo } from "../types";
import TodoForm from "./TodoForm";
import TodoList from "./TodosList";

export const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loadingTodos, setLoadingtTodos] = useState<boolean>(true);
  const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setEditTodo = (todo: ITodo) => {
    setActiveTodo(todo);
  };

  const resetError = () => setError(null);

  const onDeleteTodo = (id: string) => {
    clientAPI
      .deleteTodo(id)
      .then((res) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onAddTodo = (todo: Omit<ITodo, "id">) => {
    clientAPI
      .addTodo(todo)
      .then((addedTodo) => {
        const updatedTodos = [...todos, addedTodo];

        setTodos(updatedTodos);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onUpdateTodo = (todo: ITodo) => {
    clientAPI
      .updateTodo(todo)
      .then((updated) => {
        const updatedTodos = todos.map((td) =>
          td.id === todo.id ? updated : td
        );

        setTodos(updatedTodos);
        setActiveTodo(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    clientAPI
      .getTodos()
      .then((todos) => {
        setTodos(todos);
        setLoadingtTodos(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoadingtTodos(false);
      });
  }, []);

  return (
    <Container
      bg="cyan"
      p="1.5rem"
      my={40}
      size={700}
      style={{ borderRadius: "1rem" }}
    >
      <Stack align="center">
        <Title size="xxx-large" fw="bold">
          Todo list
        </Title>
        <TodoForm
          onAddTodo={onAddTodo}
          onCancelUpdateTodo={() => setActiveTodo(null)}
          onUpdateTodo={onUpdateTodo}
          todo={activeTodo}
        />
        {loadingTodos && <Loader color="blue" />}
        {!loadingTodos && todos.length > 0 ? (
          <TodoList
            deleteTodo={onDeleteTodo}
            doneTode={onUpdateTodo}
            setEditTodo={setEditTodo}
            todos={todos}
          />
        ) : (
          <Text color="white" size="lg">
            No todos to show
          </Text>
        )}
      </Stack>
      {error && (
        <Notification
          color="red"
          onClose={resetError}
          title="Error"
          withCloseButton
        >
          {error}
        </Notification>
      )}
    </Container>
  );
};

export default Todos;
