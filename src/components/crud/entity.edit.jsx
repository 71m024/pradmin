import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../service/data.service';
import DataContext from './data-context';

export default function EntityEdit({ resource, children }) {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(`${resource}/${id}`)
      .then((response) => {
        setData(response);
      });
  }, []);

  if (data) {
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <DataContext.Provider value={[data, setData]}>
        {children}
      </DataContext.Provider>
    );
  }
  return 'loading...';
}
