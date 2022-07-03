import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import DataContext from './context/data.context';
import ServiceContext from './context/service.context';

export default function EntityEdit({ resource, children }) {
  const { id } = useParams();
  const { dataService } = useContext(ServiceContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataService) {
      dataService.getData(`${resource}/${id}`)
        .then((response) => {
          setData(response);
        });
    }
  }, [dataService]);

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
