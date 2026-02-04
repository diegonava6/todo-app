import { useState } from 'react'
import './App.css'
import { useAuth } from './context/AuthContext.jsx'
import { tokenManager } from './utils/tokenManager.js'

function App() {
  const { isAuthenticated, user, login, logout, loading } = useAuth()
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [tokenInput, setTokenInput] = useState('')
  const [showTokenSetup, setShowTokenSetup] = useState(!isAuthenticated)

  const addTodo = () => {
    if (input.trim() === '') return
    setTodos([...todos, { id: Date.now(), text: input, done: false }])
    setInput('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleDone = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const startEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const saveEdit = (id) => {
    if (editText.trim() === '') return
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ))
    setEditId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }

  const handleTokenSetup = () => {
    if (tokenInput.trim() === '') return
    const success = login(tokenInput, { tokenSetup: true, createdAt: new Date().toISOString() })
    if (success) {
      setTokenInput('')
      setShowTokenSetup(false)
    }
  }

  const handleLogout = () => {
    logout()
    setShowTokenSetup(true)
    setTodos([])
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading authentication...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>🦾 Todo App</h1>
        {isAuthenticated && (
          <div className="auth-status">
            <span className="status-badge">✓ Authenticated</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {showTokenSetup && (
        <div className="token-setup">
          <div className="token-setup-card">
            <h2>🔐 Token Setup</h2>
            <p>Enter your API token to get started:</p>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTokenSetup()}
              placeholder="Enter your token..."
              className="token-input"
            />
            <button onClick={handleTokenSetup} className="token-submit-btn">Setup Token</button>
            <p className="token-hint">Your token is stored securely in local storage.</p>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            {editId === todo.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                  autoFocus
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="view-mode">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
                <div className="actions">
                  <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="stats">
          {todos.filter(t => !t.done).length} remaining · {todos.filter(t => t.done).length} completed
        </div>
      )}
        </>
      )}
    </div>
  )
}

export default App
