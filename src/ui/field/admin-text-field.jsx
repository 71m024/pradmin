import * as React from 'react';
import { TextField } from '@mui/material';
import { useCallback, useContext } from 'react';
import { toCapitalizedWords } from '../../util/string-functions';
import DataContext from '../../context/data.context';

export default function AdminTextField({
  name, label, numeric = false, chars = false, inputProps, ...rest
}) {
  const [data, setData] = useContext(DataContext);

  const parseValue = useCallback((newValue) => {
    if (chars) return newValue;
    if (newValue.match('[0-9]+')) return parseInt(newValue, 10);
    if (numeric && newValue === '') return null;
    return newValue;
  }, []);

  const handleInput = useCallback((e) => {
    const { name: targetName } = e.target;
    const newValue = e.target.value;
    setData({
      ...data,
      [targetName]: parseValue(newValue),
    });
  }, []);

  return (
    <TextField
      label={label || toCapitalizedWords(name)}
      name={name}
      value={data[name] ?? ''}
      onChange={handleInput}
      inputProps={{ ...inputProps, ...(numeric ? { inputMode: 'numeric' } : {}) }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
    />
  );
}
