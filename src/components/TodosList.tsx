import React, { FC } from "react";
import { ActionIcon, Card, Flex, Group, List, Text, rem } from "@mantine/core";
import {
  IconCheckbox,
  IconEdit,
  IconSquare,
  IconTrash,
} from "@tabler/icons-react";

import { ITodo } from "../types";

type Props = {
  todos: ITodo[];
  setEditTodo: (todo: ITodo) => void;
  deleteTodo: (id: string) => void;
  doneTode: (todo: ITodo) => void;
};

const TodoList: FC<Props> = ({ todos, setEditTodo, deleteTodo, doneTode }) => {
  const handleDoneTodo = (todo: ITodo) => {
    doneTode({
      ...todo,
      done: !todo.done,
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {todos.map((todo) => (
        <Card key={todo.id} bg="indigo" mb="0.5rem">
          <Flex justify="space-between" align="flex-start">
            <Group w="80%" align="flex-start">
              <ActionIcon
                aria-label={
                  todo.done ? "Mark todo as not done" : "Mark todo as done"
                }
                variant={todo.done ? "filled" : "white"}
              >
                {todo.done ? (
                  <IconCheckbox
                    style={{ width: rem(24), height: rem(24) }}
                    onClick={() => handleDoneTodo(todo)}
                  />
                ) : (
                  <IconSquare
                    style={{ width: rem(24), height: rem(24) }}
                    onClick={() => handleDoneTodo(todo)}
                  />
                )}
              </ActionIcon>
              <Text
                w="90%"
                color="white"
                fw={500}
                size="lg"
                td={todo.done ? "line-through" : ""}
              >
                {todo.title}
              </Text>
            </Group>
            <Group>
              <ActionIcon
                aria-label="Edit todo"
                variant="filled"
                disabled={todo.done}
              >
                <IconEdit
                  style={{ width: rem(24), height: rem(24) }}
                  onClick={() => setEditTodo(todo)}
                />
              </ActionIcon>
              <ActionIcon aria-label="Delete todo" variant="filled" color="red">
                <IconTrash
                  style={{ width: rem(24), height: rem(24) }}
                  onClick={() => deleteTodo(todo.id)}
                />
              </ActionIcon>
            </Group>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
