import { useState } from 'react';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import UseTable from '../UseTable';
import bookings from '../../__mocks__/customers';
import StatusChip from '../StatusChip';

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
  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(bookings, headCells, filterfn);
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
                <TableRow hover key={item.id}>
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

{
  /* <Table>
  <TableHead>
    <TableRow>
      <TableCell>Order Ref</TableCell>
      <TableCell>Customer</TableCell>
      <TableCell sortDirection="desc">
        <Tooltip enterDelay={300} title="Sort">
          <TableSortLabel active direction="desc">
            Date
          </TableSortLabel>
        </Tooltip>
      </TableCell>
      <TableCell>Status</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {bookings.map((order) => (
      <TableRow hover key={order.id}>
        <TableCell>{order.ref}</TableCell>
        <TableCell>{order.customer.name}</TableCell>
        <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
        <TableCell>
          <Chip color="primary" label={order.status} size="small" />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>; */
}
