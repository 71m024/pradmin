import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button, Grid, Paper, Stack, TableContainer,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteData, getData } from '../../service/data.service';
import ConfirmationDialog from '../confirmation-dialog';
import { toCapitalizedWords } from '../../util/string-functions';

export default function EntityList({ resource, label, columns }) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const loadData = () => {
    getData(resource)
      .then((response) => setData((response)));
  };

  useEffect(() => {
    loadData();
  }, []);

  const rowClickHandler = (rowParams) => {
    navigate(`/${resource}/${rowParams.row.id}`);
  };

  const rowSelectionHandler = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    const promises = [];
    selectedRows.forEach((rowId) => {
      promises.push(deleteData(`${resource}/${rowId}`));
    });
    Promise.all(promises).then(() => {
      navigate(`/${resource}`, {
        state: {
          message: {
            text: `${toCapitalizedWords(resource)} gelöscht`,
            severity: 'success',
          },
        },
      });
      setDeleteDialogOpen(false);
      loadData();
    });
  };

  if (data) {
    return (
      <>
        <ConfirmationDialog
          title="Löschen"
          message={`Bist du sicher, dass du alle ausgewählten ${label} löschen möchtest?`}
          confirmHandler={handleDeleteConfirmed}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
        />
        <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2}>
            {selectedRows.length > 0
              && (
                <Button color="error" onClick={handleDelete}>
                  <DeleteIcon /> &nbsp; Löschen
                </Button>
              )}
            <Button component={Link} variant="contained" to={`/${resource}/new`}>
              <AddIcon /> &nbsp; New
            </Button>
          </Stack>
        </Grid>
        <TableContainer component={Paper}>
          <div>
            <DataGrid
              rows={data}
              onRowDoubleClick={rowClickHandler}
              onSelectionModelChange={rowSelectionHandler}
              checkboxSelection
              autoHeight
              columns={[...columns, {
                field: 'action',
                headerName: 'Action',
                sortable: false,
                renderCell: (params) => (
                  <Button component={Link} variant="contained" to={`/${resource}/${params.row.id}`}>
                    <EditIcon />
                  </Button>
                ),
              }]}
            />
          </div>
        </TableContainer>
      </>
    );
  }
  return 'loading...';
}
