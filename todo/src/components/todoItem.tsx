import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, is_done: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}
export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <input
        type="checkbox"
        checked={todo.is_done}
        onChange={() => onToggle(todo.id, !todo.is_done)}
      />
      <span style={{ flex: 1, textDecoration: todo.is_done ? 'line-through' : 'none', color: todo.is_done ? '#888' : '#000' }}>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
        удалить
      </button>
    </li>
  )}