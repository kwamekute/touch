import { useState } from 'react';
import { Box, Button, Card, CardContent } from '@material-ui/core';

import Popup from '../Popup';
import NewAdminForm from './NewAdminForm';

const AccountToolbar = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const handleButtonClick = () => {
    setOpenPopup(true);
  };
  return (
    <>
      <Box>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleButtonClick}
              >
                Add Admin
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add new Admin"
      >
        <NewAdminForm />
      </Popup>
    </>
  );
};

export default AccountToolbar;
