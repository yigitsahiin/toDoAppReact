import React, { useState } from 'react';
import TodoForm from './components/ToDoForm';
import TodoList from './components/ToDoList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface Todo {
  text: string;
  isCompleted: boolean;
  completedAt: string | null;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    const isCompleted = !newTodos[index].isCompleted;
    newTodos[index].isCompleted = isCompleted;
    newTodos[index].completedAt = isCompleted ? new Date().toLocaleString() : null;
    setTodos(newTodos);
  };

  const updateTodo = (index: number, newText: string) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        To-Do List
      </Typography>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} toggleComplete={toggleComplete} updateTodo={updateTodo} />
    </Container>
  );
}

export default App;
