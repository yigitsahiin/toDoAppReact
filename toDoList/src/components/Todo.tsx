import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

interface TodoProps {
  todo: {
    text: string;
    isCompleted: boolean;
    completedAt: string | null;
  };
  index: number;
  removeTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
  updateTodo: (index: number, newText: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, index, removeTodo, toggleComplete, updateTodo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(todo.text);

  const handleUpdate = () => {
    updateTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={todo.isCompleted} onChange={() => toggleComplete(index)} />
          {isEditing ? (
            <TextField
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleUpdate}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUpdate();
                }
              }}
              variant="standard"
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
              }}
              onClick={() => setIsEditing(true)}
            >
              {todo.text}
            </Typography>
          )}
        </Box>
        {todo.isCompleted && (
          <Typography variant="body2" color="textSecondary">
            Completed at: {todo.completedAt}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" onClick={() => removeTodo(index)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default Todo;
