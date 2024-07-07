import React, { useState, useEffect } from 'react';
import TodoForm from './components/ToDoForm';
import TodoList from './components/ToDoList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import supabase from './supabase/supabaseClient';

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  completedAt: string | null;
  user_id: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user?.id || null);
        fetchTodos(session.user?.id);
      }
    };

    getSession();
  }, []);

  const fetchTodos = async (userId: string | null) => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching todos:', error);
    } else if (data) {
      setTodos(data);
    }
  };

  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([{ ...todo, user_id: userId }])
      .single();

    if (error) {
      console.error('Error adding todo:', error);
    } else if (data) {
      setTodos([data, ...todos]);
    }
  };

  const removeTodo = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const toggleComplete = async (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = {
        ...todo,
        isCompleted: !todo.isCompleted,
        completedAt: todo.isCompleted ? null : new Date().toLocaleString(),
      };

      const { data, error } = await supabase
        .from('todos')
        .update(updatedTodo)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error updating todo:', error);
      } else if (data) {
        setTodos(todos.map(t => (t.id === id ? data : t)));
      }
    }
  };

  const updateTodo = async (id: number, newText: string) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ text: newText })
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error updating todo:', error);
    } else if (data) {
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        To-Do List
      </Typography>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
      />
    </Container>
  );
}

export default App;
