import { createClient } from '@supabase/supabase-js';
import type { Todo } from './types';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if(!supabaseUrl || !supabaseKey) {

    throw new Error('ошибка окружения supabase')
}

const supabase = createClient(supabaseUrl,supabaseKey)

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return data || []
}

export const addTodo = async (title:string): Promise<Todo> => {
    const { data, error} = await supabase
    .from('todos')
    .insert([{title, is_done: false}])
    .select()
    .single()
    if(error) throw new Error(error.message)
        return data
}

export const toggleTodo = async (id:string, is_done:boolean): Promise<Todo> => {
const { data, error} = await supabase
.from('todos')
.update({is_done})
.eq('id', id)
.select()
.single()
if(error) throw new Error(error.message)
    return data
}
export const deleteTodo = async (id:string): Promise<void> =>{
const {error} = await supabase
.from('todos')
.delete()
.eq('id', id)
if (error) throw new Error(error.message)
}