import { useState, useEffect } from 'react';
import moment from 'moment';
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
import customers from 'src/__mocks__/customers';
import UseTable from '../UseTable';
import Popup from 'src/components/Popup';
import BookingDetails from 'src/components/booking/BookingDetails';

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
  const classes = useStyles();
  const [records, setRecords] = useState(customers);
  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(records, headCells, filterfn);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordsForEdit, setRecordsFoprEdit] = useState(null);

  const openInPopup = (item) => {
    setRecordsFoprEdit(item);
    setOpenPopup(true);
  };

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
                      {JSON.parse(localStorage.getItem('authenticatedUser'))
                        .user.permission === 'Super-Admin' ? (
                        <IconButton color="secondary">
                          <DeleteIcon size="20" />
                        </IconButton>
                      ) : null}
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
