import { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BookingListResults from 'src/components/booking/BookingListResults';
import BookingListToolbar from 'src/components/booking/BookingListToolbar';
import LoadingBackdrop from 'src/components/LoadingBackdrop';
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
          <BookingListToolbar
            open={open}
            setOpen={setOpen}
            onHandleChange={handleSearch}
          />
          <Box sx={{ pt: 3 }}>
            <BookingListResults filterfn={filterfn} />
          </Box>
        </Container>
      </Box>
      <LoadingBackdrop open={open} />
    </>
  );
};

export default BookingList;
