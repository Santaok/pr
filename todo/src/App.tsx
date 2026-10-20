import { useEffect, useState } from 'react'
import type { Todo } from './types'
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from './Api'
import { TodoForm } from './components/todoForm'
import { TodoList } from './components/todoList'


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTodos()
  }, [])
  const loadTodos = async () => {
    try {
      setLoading(true)
      const data = await fetchTodos()
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'произошла ошибка')
    } finally {
      setLoading(false)
    }}

    
  const handleAdd = async (title: string) => {
    try {
      const newTodo = await addTodo(title)
      setTodos((prev) => [...prev, newTodo])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ошибка при добавлении')
    }
  }
  const handleToggle = async (id: string, is_done: boolean) => {
    try {
      const updated = await toggleTodo(id, is_done);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ошибка при обновлении')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ошибка при удалении')
    }
  }
  if (loading) return <div style={{ padding: '20px' }}>загрузка...</div>

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>список задач</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}



export default App