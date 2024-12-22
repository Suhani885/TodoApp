import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  setCurrentUser,
  setTodos,
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
