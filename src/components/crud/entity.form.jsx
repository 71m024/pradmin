import { Button, Paper, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { deleteData, postData, putData } from '../../service/data.service';
import DataContext from './data-context';

const paperStyle = {
  paddingTop: 20, paddingLeft: 30, paddingBottom: 20, paddingRight: 30,
};

export default function EntityForm({
  resource, children, cards,
}) {
  const [data] = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const saveFunction = data.id ? putData : postData;

    saveFunction(`${resource}${data.id ? `/${data.id}` : ''}`, data)
      .then(() => {
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
      })
      .catch((error) => {
        console.error('Error:', error);
        navigate(`/${resource}`, {
          state: {
            message: {
              text: data.id ? 'Bearbeiten ist fehlgeschlagen' : 'Erstellung ist fehlgeschlagen',
              severity: 'error',
            },
          },
        });
      });
  };

  const handleDelete = () => {
    deleteData(`${resource}/${data.id}`).then(() => navigate(`/${resource}`, {
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
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Paper style={paperStyle} key="main-card">
            <Stack spacing={2}>
              {children}
            </Stack>
          </Paper>
          {cards && cards.map((c) => <Paper style={paperStyle} key={`card-${c.key}`}>{c}</Paper>)}
          <Paper style={paperStyle} key="button-card">
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="outlined" color="success">
                <SaveIcon /> &nbsp; Speichern
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
