import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import AdminSelectField from './admin-select-field';
import DataContext from '../crud/context/data.context';
import ServiceContext from '../crud/context/service.context';

export default function AdminResourceSelectField({
  name, label, resource, itemReferenceGetter,
}) {
  const { dataService } = useContext(ServiceContext);
  const [data] = useContext(DataContext);
  const [values, setValues] = useState(null);

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
