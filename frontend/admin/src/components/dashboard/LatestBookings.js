import { useState, useEffect } from 'react';
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
import customers from 'src/__mocks__/customers';

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
  const classes = useStyles();
  const [filterfn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const [records, setRecords] = useState(customers);
  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(records, headCells, filterfn);

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
