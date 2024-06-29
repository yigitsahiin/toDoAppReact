import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface TodoFormProps {
  addTodo: (todo: { text: string; isCompleted: boolean; completedAt: string | null }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    addTodo({
      text: input,
      isCompleted: false,
      completedAt: null,
    });
    setInput('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        label="Add a new task"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>
        Add
      </Button>
    </Box>
  );
}

export default TodoForm;
