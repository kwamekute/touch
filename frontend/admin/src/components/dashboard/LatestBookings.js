import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core';
import UseTable from '../UseTable';
import StatusChip from '../StatusChip';
import { GlobalContext } from 'src/context/GlobalState';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', disableSorting: true },
  { id: 'roomType', label: 'Room Type' },
  { id: 'bookedAt', label: 'Date Booked' },
  { id: 'status', label: 'Status', disableSorting: true }
];
const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3)
  }
}));

const LatestBookings = (props) => {
  const { latestBookings, getLatestBookings, user } = useContext(GlobalContext);
  const classes = useStyles();
  const [filterfn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterSorting } =
    UseTable(latestBookings, headCells, filterfn);

  useEffect(() => {
    getLatestBookings(user);
    //eslint-diable-next-line react-hooks/exhustive-deps
  }, []);

  return (
    <PerfectScrollbar>
      <Card>
        <CardHeader title="Latest Bookings" />
        <Divider />
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
        <CardActions>
          <Button href="/app/bookings">View More</Button>
        </CardActions>
      </Card>
    </PerfectScrollbar>
  );
};

export default LatestBookings;
