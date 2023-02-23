import { configureStore } from "@reduxjs/toolkit";
import todoList from "./slices/todoList";

const store = configureStore({
  reducer: {
    todoList
  }
});

export default store;