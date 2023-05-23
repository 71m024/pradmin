import * as React from 'react';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import { toCapitalizedWords } from '../../util/string-functions';
import DataContext from '../../context/data.context';

export default function AdminTextField({
  name, label, numeric = false, required = false, inputProps, ...rest
}) {
  const [data, setData] = useContext(DataContext);

  const handleInput = (e) => {
    const { name: targetName } = e.target;
    const newValue = e.target.value;
    setData({
      ...data,
      [targetName]: (newValue.match('[0-9]+')) ? parseInt(newValue) : newValue,
    });
  };

  return (
    <TextField
      label={label || toCapitalizedWords(name)}
      name={name}
      value={data[name] ?? ''}
      onChange={handleInput}
      required={required}
      inputProps={{ ...inputProps, ...(numeric ? { inputMode: 'numeric' } : {}) }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
    />
  );
}
