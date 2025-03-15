import { useState, useEffect } from 'react'

export default function TodoCard() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : ['go play mc', 'wash the darn dishes']
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    setTodos([...todos, text])
  }

  const editTodo = (index, newText) => {
    const newTodos = [...todos]
    newTodos[index] = newText
    setTodos(newTodos)
  }

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const deleteAll = () => {
    setTodos([])
  }

  return { todos, addTodo, editTodo, deleteTodo, deleteAll }
}
