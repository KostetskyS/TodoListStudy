import TodoList from "./todo/TodoList";
import React, { useState, useEffect } from 'react';
import Context from "./todo/context";
import Loader from "./Loader";
import Modal from "./modal/Modal";
function App() {

  const [todos, setTodos] = useState([]) ;
  const [loading, setLoading] = useState(true)
  const AddTodo = React.lazy(() => import('./todo/AddTodo'))
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => response.json())
        .then(todos => {
          setTodos(todos)
          setLoading(false)
        })
  }, [])

  function toggleTodo (id) {
    setTodos( todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
        todos.concat([{
        title,
        id: Date.now(),
        completed: false
      }
    ]))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>My Notes</h1>
        <Modal/>
        <React.Suspense fallback={<p>loading..</p>}> 
          <AddTodo onCreate={addTodo}/> 
        </React.Suspense>
        {loading && <Loader/>}
        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}/>) : loading ? null : (
          <p>list of notes is empty</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
