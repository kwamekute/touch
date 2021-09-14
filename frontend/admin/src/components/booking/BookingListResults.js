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
  IconButton
} from '@material-ui/core';
import { Edit as EditIcon, Trash2 as DeleteIcon } from 'react-feather';
import UseTable from '../UseTable';
import Popup from 'src/components/Popup';
import BookingDetails from 'src/components/booking/BookingDetails';
import { GlobalContext } from 'src/context/GlobalState';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';
import Loading from '../Loading';

const headCells = [
  { id: 'name', label: 'Full Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', disableSorting: true },
  { id: 'roomType', label: 'Room type' },
  { id: 'arrival', label: 'Arrival', disableSorting: true },
  { id: 'depature', label: 'Depature', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true }
];

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3)
  }
}));

const BookingListResults = ({ filterfn }) => {
  const {
    bookings,
    getBookings,
    user,
    error,
    logOutUser,
    updateBooking,
    deleteBooking,
    loading
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
    updateBooking(values, user).then(() => {
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: 'Status changed successfully',
        type: 'success'
      });
    });
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

  useEffect(() => {
    getBookings(user).then(() => {
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
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.roomType}</TableCell>
                      <TableCell>{item.checkIn}</TableCell>
                      <TableCell>{item.checkOut}</TableCell>
                      <TableCell>
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
