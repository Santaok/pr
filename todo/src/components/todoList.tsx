import type { Todo } from '../types'
import { TodoItem } from './todoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string, is_done: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  if (todos.length === 0) return <p>задач пока нет.</p>

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )}