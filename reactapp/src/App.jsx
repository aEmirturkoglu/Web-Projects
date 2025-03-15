import TodoList from "./components/TodoList"
import TodoCard from "./components/TodoCard"


function App() {
  const { todos, addTodo, editTodo, deleteTodo, deleteAll } = TodoCard()

  return (
    <>
      <header>
        <h2>Todo List</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          const input = e.target.elements[0]
          if (input.value.trim()) {
            addTodo(input.value.trim())
            input.value = ''
          }
        }}>
          <input placeholder='add todo' />
          <button type="submit">Add</button>
          {todos.length > 0 && (
            <button type="button" onClick={deleteAll} className="delete-all">Delete All</button>
          )}
        </form>
      </header>
      <TodoList 
        todos={todos} 
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </>
  )
}

export default App

