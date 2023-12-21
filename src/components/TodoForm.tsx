import React, { useEffect, useState, useRef, FC, FormEvent } from "react";
import { Button, Group, TextInput } from "@mantine/core";

import { ITodo } from "../types";

type Props = {
  todo?: ITodo | null;
  onAddTodo: (todo: Omit<ITodo, "id">) => void;
  onUpdateTodo: (todo: ITodo) => void;
  onCancelUpdateTodo: () => void;
};

const TodoList: FC<Props> = ({
  onAddTodo,
  todo,
  onUpdateTodo,
  onCancelUpdateTodo,
}) => {
  const [title, setTitle] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const cancelUpdateHandler = () => {
    onCancelUpdateTodo();
    setTitle("");
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todo) {
      const addTodo: Omit<ITodo, "id"> = {
        title: title,
      };
      onAddTodo(addTodo);
    } else {
      const updatedTodo: ITodo = {
        ...todo,
        title: title,
      };
      onUpdateTodo(updatedTodo);
    }

    setTitle("");
  };

  useEffect(() => {
    if (todo?.title) {
      setTitle(todo?.title);
    } else {
      setTitle("");
    }

    titleInputRef?.current?.focus();
  }, [todo]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Group>
        <TextInput
          aria-label="Enter todo title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter todo title"
          ref={titleInputRef}
          required
          value={title}
          w="400"
        />
        <Button type="submit">{todo ? "Update todo" : "Add todo"}</Button>
        {todo?.title && <Button onClick={cancelUpdateHandler}>Cancel</Button>}
      </Group>
    </form>
  );
};

export default TodoList;
