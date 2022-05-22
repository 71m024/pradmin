import * as React from 'react';
import { useContext, useState } from 'react';
import {
  Button, Chip, Stack, TextField,
} from '@mui/material';
import DataContext from '../crud/data-context';

export default function AdminChipField({ valueField }) {
  const [data, setData] = useContext(DataContext);
  const [newChip, setNewChip] = useState('');

  const handleDeleteChip = (role) => () => {
    const newValues = data[valueField].filter((r) => (r !== role));
    setData({ ...data, [valueField]: newValues });
  };

  const handleAddChip = () => {
    if (!data[valueField].includes(newChip)) {
      setData({ ...data, [valueField]: [...data[valueField], newChip] });
      setNewChip('');
    }
  };

  const updateNewChip = (e) => {
    setNewChip(e.target.value);
  };

  const chipStyle = {
    marginTop: '5px',
  };

  return (
    <Stack direction="row" spacing={1}>
      {data[valueField].map((r) => (
        <Chip key={r} label={r} onDelete={handleDeleteChip(r)} style={chipStyle} />
      ))}
      <TextField
        label="New"
        onChange={updateNewChip}
        size="small"
        value={newChip}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddChip();
            e.preventDefault();
          }
        }}
      />
      <Button onClick={handleAddChip}>Add</Button>
    </Stack>
  );
}
