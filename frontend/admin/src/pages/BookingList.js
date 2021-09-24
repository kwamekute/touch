import { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BookingListResults from 'src/components/booking/BookingListResults';
import BookingListToolbar from 'src/components/booking/BookingListToolbar';
import { GlobalContext } from 'src/context/GlobalState';

const BookingList = () => {
  const [open, setOpen] = useState(false);
  const [filterfn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const { user, getBookings } = useContext(GlobalContext);

  useEffect(() => {
    getBookings(user);
    //eslint-diable-next-line react-hooks/exhustive-deps;
  }, []);

  const handleSearch = (values) => {
    setFilterFn({
      fn: (items) => {
        if (!values) return items;
        else
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(values.name.toLowerCase()) &&
              x.email.toLowerCase().includes(values.email.toLowerCase()) &&
              x.phone.includes(values.phone) &&
              x.roomType.toLowerCase().includes(values.room.toLowerCase()) &&
              x.checkIn.includes(values.checkInDate) &&
              x.checkOut.includes(values.checkOutDate)
          );
      }
    });
  };

  const handleReset = () => {
    setFilterFn({
      fn: (items) => {
        return items;
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Luxury Touch Hotel | Bookings </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <BookingListToolbar
            onhandleSearch={handleSearch}
            onhandleReset={handleReset}
          />
          <Box sx={{ pt: 3 }}>
            <BookingListResults filterfn={filterfn} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BookingList;
