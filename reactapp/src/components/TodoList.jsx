import { useState } from 'react'

export default function TodoList({ todos, onEdit, onDelete }) {
  const [editIndex, setEditIndex] = useState(-1)
  const [editText, setEditText] = useState('')

  const handleEditClick = (index, todo) => {
    setEditIndex(index)
    setEditText(todo)
  }

  const handleEditSubmit = (index) => {
    onEdit(index, editText)
    setEditIndex(-1)
    setEditText('')
  }

  return (
    <ul>
      {todos.map((todo, todoIndex) => (
        <li key={todoIndex}>
          {editIndex === todoIndex ? (
            <div className="edit-container">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit(todoIndex)}
              />
              <button onClick={() => handleEditSubmit(todoIndex)}>Save</button>
              <button onClick={() => setEditIndex(-1)}>Cancel</button>
            </div>
          ) : (
            <div className="todo-item">
              <span>{todo}</span>
              <div className="todo-actions">
                <button onClick={() => handleEditClick(todoIndex, todo)}>Edit</button>
                <button onClick={() => onDelete(todoIndex)}>Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>

  )
}

