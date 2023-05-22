import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import AdminSelectField from './admin-select-field';
import DataContext from '../../context/data.context';
import { ServiceContext } from '../../context/service.context';

export default function AdminResourceSelectField({
  name, label, resource, itemReferenceGetter, value, setValue, comparator,
}) {
  const { dataService } = useContext(ServiceContext);
  const [data] = useContext(DataContext);
  const [values, setValues] = useState(null);
  const { register } = useForm();
  const { ref: inputRef, ...inputProps } = register(name, {
    required: 'Dieses Feld darf nicht leer sein!',
  });

  useEffect(() => {
    dataService.getData(resource)
      .then((response) => {
        setValues(response);
      });
  }, [resource]);

  const menuItemFactory = itemReferenceGetter
    ? (v) => <MenuItem key={v.id} value={itemReferenceGetter(v)}>{v.name}</MenuItem>
    : (v) => <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>;

  if (values) {
    if (comparator) {
      values.sort(comparator);
    }
    return (
      <AdminSelectField
        name={name}
        label={label}
        value={(value) || (data[name] ? (data[name].id ?? data[name]) : '')}
        values={values}
        setValue={setValue}
        menuItemFactory={menuItemFactory}
        inputRef={inputRef}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...inputProps}
        required
      />
    );
  }
  return 'loading...';
}
