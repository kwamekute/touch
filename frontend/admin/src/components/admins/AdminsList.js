import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Typography
} from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import { Edit as EditIcon, Trash2 as DeleteIcon } from 'react-feather';
import UseTable from '../UseTable';
import Popup from 'src/components/Popup';
import { GlobalContext } from 'src/context/GlobalState';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Loading from '../Loading';
import moment from 'moment';
import AdminDetails from './AdminDetails';

const headCells = [
  { id: 'name', label: 'Full Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', disableSorting: true },
  { id: 'permission', label: 'Permission', disableSorting: true },
  { id: 'dateCraeted', label: 'Added on', disableSorting: true },
  { id: 'status', label: 'Status', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3)
  }
}));

const AdminsList = ({ filterfn }) => {
  const {
    getAdmins,
    user,
    error,
    loading,
    logOutUser,
    admins,
    updateAdmin,
    deleteAdmin
  } = useContext(GlobalContext);

  const classes = useStyles();
  const navigate = useNavigate();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(admins, headCells, filterfn);

  const [openPopup, setOpenPopup] = useState(false);
  const [recordsForEdit, setRecordsFoprEdit] = useState(null);

  const openInPopup = (item) => {
    setRecordsFoprEdit(item);
    setOpenPopup(true);
  };

  const handleSubmit = (values) => {
    if (error === 'Access not authorized, There was an error => jwt expired') {
      logOutUser();
      navigate('/login', { replace: true });
    }
    updateAdmin(user, values).then(() => {
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: 'Permission changed successfully',
        type: 'success'
      });
    });
  };

  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    deleteAdmin(id, user).then(() => {
      setNotify({
        isOpen: true,
        message: 'Admin deleted successfully',
        type: 'error'
      });
    });
  };

  useEffect(() => {
    getAdmins(user).then(() => {
      if (
        error === 'Access not authorized, There was an error => jwt expired'
      ) {
        logOutUser();
        navigate('/login', { replace: true });
      }
    });
    //eslint-diable-next-line react-hooks/exhustive-deps
  }, []);

  return (
    <>
      <Card className={classes.card}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <TblContainer>
              <TblHead />
              {loading ? (
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Loading />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {recordsAfterSorting().map((item) => (
                    <TableRow hover key={item._id}>
                      <TableCell>
                        <Grid container>
                          <Grid item lg={4}>
                            <Avatar variant="string" src="." alt={item.name} />
                          </Grid>
                          <Grid item lg={8}>
                            <Typography> {item.name}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography> {item.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{item.permission}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(item.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      {item.inviteToken ? (
                        <TableCell>
                          <Chip
                            size="small"
                            label="pending"
                            style={{
                              backgroundColor: orange[600],
                              color: 'white'
                            }}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Chip
                            size="small"
                            label="activated"
                            style={{
                              backgroundColor: green[600],
                              color: 'white'
                            }}
                          />
                        </TableCell>
                      )}
                      <TableCell padding="none">
                        <div
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                            alignContent: 'center'
                          }}
                        >
                          <IconButton
                            color="inherit"
                            onClick={() => openInPopup(item)}
                          >
                            <EditIcon size="20" />
                          </IconButton>
                          {user.user.permission === 'Super-Admin' ? (
                            <IconButton
                              color="secondary"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title:
                                    'Are you sure you want to delete this admin?',
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    onDelete(item._id);
                                  }
                                });
                                //
                              }}
                            >
                              <DeleteIcon size="20" />
                            </IconButton>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </TblContainer>
            <TblPagination />
          </Box>
        </PerfectScrollbar>
      </Card>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Admin Details"
        subTitle="Edit admin information"
      >
        <AdminDetails
          recordsforedit={recordsForEdit}
          handleSubmit={handleSubmit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default AdminsList;
