import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todoItem: [],
  },
  reducers: {
    display: (state, action) => {
      state.todoItem = action.payload
    },
  },
})

export const { display } = todosSlice.actions

export const getTodo = () => (dispatch) => {
  axios.get("/api/todos").then((r) => dispatch(display(r.data)))
}

export const addTodo = (obj) => (dispatch) => {
  axios.post("/api/todos", {description: obj}).then((r) => {dispatch(getTodo())})
}

export const removeTodo = (id) => (dispatch) => {
  axios.delete("/api/todos/" + id).then((r) => dispatch(getTodo()))
}

export const toggleTodo = (obj) => (dispatch) => {
  axios.patch("/api/todos/" + obj.id, {status: obj.status}).then((r) => {
    dispatch(getTodo())
  })
}

export const selectTodos = (state) => state.todos.todoItem

export default todosSlice.reducer

















