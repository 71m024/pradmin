import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import AdminSelectField from './admin-select-field';
import { getData } from '../../service/data.service';
import DataContext from '../crud/data-context';

export default function AdminResourceSelectField({
  name, label, resource, itemReferenceGetter,
}) {
  const [data] = useContext(DataContext);
  const [values, setValues] = useState(null);

  useEffect(() => {
    getData(resource)
      .then((response) => {
        setValues(response);
      });
  }, [resource]);

  const menuItemFactory = itemReferenceGetter
    ? (v) => <MenuItem key={v.id} value={itemReferenceGetter(v)}>{v.name}</MenuItem>
    : (v) => <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>;

  if (values) {
    return (
      <AdminSelectField
        name={name}
        label={label}
        value={data[name] ? (data[name].id ?? data[name]) : ''}
        values={values}
        menuItemFactory={menuItemFactory}
      />
    );
  }
  return 'loading...';
}
