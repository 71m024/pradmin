import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import DataContext from './data-context';
import DataServiceContext from './data-service-context';

export default function EntityEdit({ resource, children }) {
  const { id } = useParams();
  const [dataService] = useContext(DataServiceContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    dataService.getData(`${resource}/${id}`)
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
