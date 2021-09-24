import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Grid,
  Typography,
  Toolbar
} from '@material-ui/core';
import { Edit as EditIcon, Trash2 as DeleteIcon } from 'react-feather';
import UseTable from '../UseTable';
import Popup from 'src/components/Popup';
import BookingDetails from 'src/components/booking/BookingDetails';
import { GlobalContext } from 'src/context/GlobalState';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Loading from '../Loading';
import moment from 'moment';
import StatusChip from '../StatusChip';
import FilterTable from '../FilterTable';

const headCells = [
  { id: 'Details', label: 'Personal Details' },
  { id: 'roomType', label: 'Room type' },
  { id: 'arrival', label: 'Arrival', disableSorting: true },
  { id: 'depature', label: 'Depature', disableSorting: true },
  { id: 'bookedAt', label: 'Date Booked' },
  { id: 'status', label: 'Status', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

const BookingListResults = ({ filterfn }) => {
  const {
    bookings,
    user,
    error,
    logOutUser,
    updateBooking,
    deleteBooking,
    loading,
    getStats
  } = useContext(GlobalContext);

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
    UseTable(bookings, headCells, filterfn);

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
    updateBooking(values, user).then(async () => {
      await getStats(user);
      setNotify({
        isOpen: true,
        message: 'Status changed successfully',
        type: 'success'
      });
    });
    setOpenPopup(false);
  };

  const onDelete = (id) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    deleteBooking(id, user).then(() => {
      setNotify({
        isOpen: true,
        message: 'Booking deleted successfully',
        type: 'error'
      });
    });
  };

  return (
    <>
      <Card>
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
                  {recordsAfterSorting().length === 0 ? (
                    <TableRow
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <TableCell>
                        <Typography>No Data to show</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    recordsAfterSorting().map((item) => (
                      <TableRow hover key={item._id}>
                        <TableCell>
                          <Grid container>
                            <Grid item>
                              <Typography>Name: {item.name}</Typography>
                              <Typography color="textSecondary" variant="body2">
                                Email: {item.email}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                variant="caption"
                              >
                                Phone: {item.phone}
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.roomType}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.checkIn}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.checkOut}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {moment(item.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StatusChip status={item.status} />
                        </TableCell>
                        <TableCell padding="none">
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
                                    'Are you sure you want to delete this booking?',
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
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
        title="Booking Details"
        subTitle="Only the Status of a booking can be edited"
      >
        <BookingDetails
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

export default BookingListResults;
