import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, getTodo, removeTodo, toggleTodo, selectTodos } from "./todosSlice"

export function Todos(){
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos)
  const [inputText, setInputText] = useState("")
  
  console.log(todos)

  useEffect(() => {
    dispatch(getTodo(todos))
  }, [])

  function handleClick(e){
    e.preventDefault()
    dispatch(addTodo(inputText))
    setInputText("")
  }

  function handleToggle(id, status){
    dispatch(toggleTodo({id, status}))
  }
  
  return (
    <div>
      <div className="container blackBorder">
        <div className="todoListBody">
        <form className="todoForm" onSubmit={handleClick}>
          <input 
            className="todoInput" 
            type="text" 
            value={inputText}
            placeholder="Enter your todo here" 
            onChange={(e) => setInputText(e.target.value)}></input>
        </form>
        <div className="todoItemsHeader">
          <div className="descriptionHeader">Description</div>
          <div className="statusHeader">Status</div>
        </div>
        <div className="todoItemBody">
        {todos.map((item) => (
          <div className="todoItem blackBorder" id={item.id} key={item.id}>
            <div className="descriptionBody">{item.description}</div>
            <div className="statusBody">{item.status}</div>
            <button className="completeBody" onClick={() => handleToggle(item.id, "completed")}>Completed</button>
            <button className="activeBody" onClick={() => handleToggle(item.id, "active")}>Active</button>
            <button className="deleteTodoItem" type="button" onClick={() => dispatch(removeTodo(item.id))}>X</button>
          </div>
        ))}
        </div>
        </div>
      </div>
    </div>
  )
}

