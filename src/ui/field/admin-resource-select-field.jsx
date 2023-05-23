import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import AdminSelectField from './admin-select-field';
import DataContext from '../../context/data.context';
import { ServiceContext } from '../../context/service.context';

export default function AdminResourceSelectField({
  name, label, resource, itemReferenceGetter, value, setValue, comparator, required,
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
        required={required}
      />
    );
  }
  return 'loading...';
}
