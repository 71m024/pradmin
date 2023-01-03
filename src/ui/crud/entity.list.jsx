import * as React from 'react';
import {
  Button, Grid, Paper, Stack, TableContainer,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import ConfirmationDialog from '../confirmation-dialog';
import { toCapitalizedWords } from '../../util/string-functions';
import { ServiceContext } from '../../context/service.context';
import { NotificationContext } from '../../context/notification.context';

export default function EntityList({
  resource, label, columns, additionalButtons, initialState = {}, enableSearch = true,
}) {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const services = React.useContext(ServiceContext);
  const [data, setData] = React.useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const { setState: setNotificationState } = useContext(NotificationContext);

  const loadData = () => {
    services.dataService.getData(resource)
      .then((response) => setData((response)));
  };

  React.useEffect(() => {
    if (services) {
      loadData();
    }
  }, [services]);

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
      promises.push(services.dataService.deleteData(`${resource}/${rowId}`));
    });
    Promise.all(promises).then(() => {
      navigate(`/${resource}`);
      setNotificationState({
        title: `${toCapitalizedWords(resource)} gelöscht`,
        severity: 'success',
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
                  <DeleteIcon />
                  {' '}
&nbsp; Löschen
                </Button>
              )}
            {additionalButtons}
            <Button component={Link} variant="contained" to={`/${resource}/new`}>
              <AddIcon />
              {' '}
&nbsp; New
            </Button>
          </Stack>
        </Grid>
        <TableContainer component={Paper}>
          <div>
            <DataGrid
              initialState={initialState}
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
              disableColumnFilter={enableSearch}
              disableColumnSelector={enableSearch}
              disableDensitySelector={enableSearch}
              components={enableSearch ? { Toolbar: GridToolbar } : {}}
              componentsProps={enableSearch ? {
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              } : {}}
            />
          </div>
        </TableContainer>
      </>
    );
  }
  return 'loading...';
}
