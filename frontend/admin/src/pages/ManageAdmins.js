import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AdminsList from 'src/components/admins/AdminsList';
import { useState } from 'react';

const ManageAdmins = () => {
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
        <title>Luxury Touch Hotel | Manage Admins</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ pt: 3 }}>
            <AdminsList filterfn={filterfn} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ManageAdmins;
