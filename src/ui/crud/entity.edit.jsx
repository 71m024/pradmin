import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../../context/data.context';
import { ServiceContext } from '../../context/service.context';
import { PageContext } from '../../context/page.context';

export default function EntityEdit({ resource, children }) {
  const { id } = useParams();
  const { dataService } = useContext(ServiceContext);
  const [data, setData] = useState(null);
  const { setState: setPageState } = useContext(PageContext);

  useEffect(() => {
    if (dataService) {
      dataService.getData(`${resource}/${id}`)
        .then((response) => {
          setData(response);
          setPageState({
            title: response.name,
          });
          document.title = response.name;
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
