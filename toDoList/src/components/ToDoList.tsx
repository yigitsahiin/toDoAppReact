import React from 'react';
import Todo from './Todo';
import List from '@mui/material/List';

interface TodoListProps {
  todos: {
    text: string;
    isCompleted: boolean;
    completedAt: string | null;
  }[];
  removeTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
  updateTodo: (index: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, removeTodo, toggleComplete, updateTodo }) => {
  return (
    <List>
      {todos.map((todo, index) => (
        <div key={index}>
          <Todo
            index={index}
            todo={todo}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
            updateTodo={updateTodo}
          />
        </div>
      ))}
    </List>
  );
}

export default TodoList;
