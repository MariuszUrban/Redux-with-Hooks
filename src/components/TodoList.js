import React, { useMemo } from "react";
import ConnectTodoItem from "../containers/ConnectTodoItem";

export default function TodoList({ filter, todos }) {
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => t.completed === false);

      case "completed":
        return todos.filter((t) => t.completed === true);

      default:
      case "all":
        return todos;
    }
  }, [filter, todos]);

  return filteredTodos.map((item) => (
    <ConnectTodoItem {...item} key={item.id} />
  ));
}
