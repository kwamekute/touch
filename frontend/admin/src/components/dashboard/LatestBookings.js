import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  TableBody,
  TableRow,
  TableCell,
  makeStyles
} from '@material-ui/core';
import UseTable from '../UseTable';
import StatusChip from '../StatusChip';
import axios from 'axios';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', disableSorting: true },
  { id: 'roomType', label: 'Room Type' },
  { id: 'bookiedAt', label: 'Date Booked' },
  { id: 'status', label: 'Status', disableSorting: true }
];
const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3)
  }
}));

const LatestBookings = (props) => {
  const navigation = useNavigate();
  const classes = useStyles();
  const [filterfn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const [records, setRecords] = useState([{}]);
  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(records, headCells, filterfn);

  useEffect(() => {
    const bookings = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('authenticatedUser')).token
          }`
        }
      };

      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/bookings',
          config
        );

        setRecords(data.bookings);
      } catch (error) {
        navigation('/login', { replace: true });
        localStorage.clear();
        console.log(error);
      }
    };

    bookings();
  }, [records, navigation]);
  return (
    <Card className={classes.card}>
      <CardHeader title="Bookings" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterSorting().map((item) => (
                <TableRow hover key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.roomType}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <StatusChip status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        </Box>
      </PerfectScrollbar>
      <TblPagination />
    </Card>
  );
};

export default LatestBookings;
