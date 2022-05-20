import * as React from 'react';
import { TextField } from '@mui/material';

export default function AdminTextField({
  name, label, data, setData, ...rest
}) {
  const handleInput = (e) => {
    const { name: targetName } = e.target;
    const newValue = e.target.value;
    setData({ ...data, [targetName]: newValue });
  };

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  function toCapitalizedWords(words) {
    const wordArray = words.match(/[A-Za-z][a-z]*/g) || [];
    return wordArray.map(capitalize).join(' ');
  }

  return (
    <TextField
      label={label || toCapitalizedWords(name)}
      name={name}
      value={data[name]}
      onChange={handleInput}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
    />
  );
}
