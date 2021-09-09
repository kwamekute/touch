import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BookingListResults from 'src/components/booking/BookingListResults';
import BookingListToolbar from 'src/components/booking/BookingListToolbar';

const BookingList = () => {
  const [filterfn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const handleSearch = (event) => {
    let target = event.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(target.value.toLowerCase()) ||
              x.email.toLowerCase().includes(target.value.toLowerCase()) ||
              x.phone.includes(target.value) ||
              x.roomType.toLowerCase().includes(target.value.toLowerCase())
          );
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
          <BookingListToolbar onHandleChange={handleSearch} />
          <Box sx={{ pt: 3 }}>
            <BookingListResults filterfn={filterfn} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BookingList;
