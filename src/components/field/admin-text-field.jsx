import * as React from 'react';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import { toCapitalizedWords } from '../../util/string-functions';
import DataContext from '../crud/data-context';

export default function AdminTextField({
  name, label, ...rest
}) {
  const [data, setData] = useContext(DataContext);

  const handleInput = (e) => {
    const { name: targetName } = e.target;
    const newValue = e.target.value;
    setData({ ...data, [targetName]: newValue });
  };

  return (
    <TextField
      label={label || toCapitalizedWords(name)}
      name={name}
      value={data[name] ?? ''}
      onChange={handleInput}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
    />
  );
}
