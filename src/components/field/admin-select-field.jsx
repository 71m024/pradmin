import * as React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { useContext } from 'react';
import { toCapitalizedWords } from '../../util/string-functions';
import DataContext from '../crud/context/data.context';

export default function AdminSelectField({
  name, label, value, values, menuItemFactory,
}) {
  const [data, setData] = useContext(DataContext);

  const handleSelectInput = (e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const assembledLabel = label ?? toCapitalizedWords(name);

  return (
    <FormControl fullWidth>
      <InputLabel>{assembledLabel}</InputLabel>
      <Select
        name={name}
        value={value ?? data[name]}
        label={assembledLabel}
        onChange={handleSelectInput}
      >
        {
          values.map(
            (v) => (
              menuItemFactory ? menuItemFactory(v) : <MenuItem key={v} value={v}>{v}</MenuItem>
            ),
          )
        }
      </Select>
    </FormControl>
  );
}
