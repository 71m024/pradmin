import { Button, Paper, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import DataContext from '../../context/data.context';
import { ServiceContext } from '../../context/service.context';

const paperStyle = {
  paddingTop: 20, paddingLeft: 30, paddingBottom: 20, paddingRight: 30,
};

export default function EntityForm({
  resource, children, cards,
}) {
  const [data] = React.useContext(DataContext);
  const { dataService } = React.useContext(ServiceContext);
  const navigate = useNavigate();

  const getSubmitHandler = (back = false) => (e) => {
    e.preventDefault();

    const saveFunction = (...args) => (data.id ? dataService.putData(...args)
      : dataService.postData(...args));

    saveFunction(`${resource}${data.id ? `/${data.id}` : ''}`, data)
      .then(() => {
        if (back) {
          setTimeout(
            () => (
              navigate(`/${resource}`, {
                state: {
                  message: {
                    text: data.id ? 'Eintrag gespeichert' : 'Eintrag erstellt',
                    severity: 'success',
                  },
                },
              })),
            data.id ? 500 : 1000, // otherwise, changes won't be displayed (server is too slow)
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDelete = () => {
    dataService.deleteData(`${resource}/${data.id}`).then(() => navigate(`/${resource}`, {
      state: {
        message: {
          text: 'Eintrag gelöscht',
          severity: 'success',
        },
      },
    }));
  };

  if (data) {
    return (
      <form>
        <Stack spacing={2}>
          <Paper style={paperStyle} key="main-card">
            <Stack spacing={2}>
              {children}
            </Stack>
          </Paper>
          {cards && cards.map((c) => <Paper style={paperStyle} key={`card-${c.key}`}>{c}</Paper>)}
          <Paper style={paperStyle} key="button-card">
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="success" onClick={getSubmitHandler()}>
                <SaveIcon />
              </Button>
              <Button variant="outlined" color="success" onClick={getSubmitHandler(true)}>
                <SaveIcon /> &nbsp; Speichern und Schliessen
              </Button>
              <Button component={Link} to={`/${resource}`} variant="outlined" color="primary">
                <FormatListBulletedIcon /> &nbsp; Übersicht
              </Button>
              {data
                && (
                  <Button variant="outlined" color="error" onClick={handleDelete}>
                    <DeleteIcon /> &nbsp; Löschen
                  </Button>
                )}
            </Stack>
          </Paper>
        </Stack>
      </form>
    );
  }
  return 'loading...';
}
