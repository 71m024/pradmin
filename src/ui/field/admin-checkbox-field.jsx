import * as React from 'react';
import { useContext } from 'react';
import {
  Stack, Checkbox,
} from '@mui/material';
import DataContext from '../../context/data.context';

export default function AdminCheckboxField({ name, label }) {
  const [data, setData] = useContext(DataContext);
  const onChangeAutoMapping = (event) => {
    setData({ ...data, [name]: event.target.checked });
  };

  return (
    <Stack direction="row" width="100%" flexWrap="wrap">
      <Checkbox checked={data[name]} onChange={onChangeAutoMapping} inputProps={{ 'aria-label': 'controlled' }} />
      <p>{label}</p>
    </Stack>
  );
}
