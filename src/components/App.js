import React, { useState, useEffect } from "react";
import { createStore } from "redux";

import Header from "./Header";
import ConnectedAddTodo from "../containers/ConnectedAddTodo";
import ConnectedTodoList from "../containers/ConnectedTodoList";
import ConnectedTodoFilter from "../containers/ConnectedTodoFilter";
import StateContext from "../StateContext";

import { fetchAPITodos } from "../api";
import appReducer from "../reducers";

const initialState = { todos: [], filter: "all" };
const store = createStore(appReducer, initialState);
const { dispatch } = store;

export default function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    fetchAPITodos().then((todos) => dispatch({ type: "FETCH_TODOS", todos }));
  }, []);

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
        <ConnectedAddTodo />
        <hr />
        <ConnectedTodoList />
        <hr />
        <ConnectedTodoFilter />
      </div>
    </StateContext.Provider>
  );
}
