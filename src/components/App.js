import React, { useState, useEffect } from "react";
import { createStore } from "redux";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../actions";
import Header from "./Header";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";
import StateContext from "../StateContext";

import { fetchAPITodos } from "../api";
import appReducer from "../reducers";

const initialState = { todos: [], filter: "all" };
const store = createStore(appReducer, initialState);
const { dispatch } = store;

export default function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function addTodo(title) {
    dispatch({ type: "ADD_TODO", title });
  }

  function toggleTodo(id) {
    dispatch({ type: "TOGGLE_TODO", id });
  }

  function removeTodo(id) {
    dispatch({ type: "REMOVE_TODO", id });
  }

  function filterTodos(filter) {
    dispatch({ type: "FILTER_TODOS", filter });
  }

  return (
    <StateContext.Provider>
      <div style={{ width: 400 }}>
        <Header />
        <AddTodo />
        <hr />
        <TodoList />
        <hr />
        <TodoFilter />
      </div>
    </StateContext.Provider>
  );
}
