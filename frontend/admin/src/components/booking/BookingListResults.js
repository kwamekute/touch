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

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', disableSorting: true },
  { id: 'roomType', label: 'Room Type' },
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
  const { bookings, getBookings, user, error } = useContext(GlobalContext);

  const classes = useStyles();
  const navigate = useNavigate();

  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(bookings, headCells, filterfn);

  const [openPopup, setOpenPopup] = useState(false);
  const [recordsForEdit, setRecordsFoprEdit] = useState(null);

  const openInPopup = (item) => {
    setRecordsFoprEdit(item);
    setOpenPopup(true);
  };

  useEffect(() => {
    getBookings(user).then(() => {
      if (
        error === 'Access not authorized, There was an error => jwt expired'
      ) {
        navigate('/login');
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
                        color="primary"
                        onClick={() => openInPopup(item)}
                      >
                        <EditIcon size="20" />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon size="20" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
        <BookingDetails recordsforedit={recordsForEdit} />
      </Popup>
    </>
  );
};

export default BookingListResults;
