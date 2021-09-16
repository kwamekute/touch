import { useState } from 'react';
import { Box, Button, Card, CardContent } from '@material-ui/core';

import Notification from '../Notification';
import Popup from '../Popup';
import NewAdminForm from './NewAdminForm';

const AccountToolbar = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });
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
        <NewAdminForm
          setNotify={setNotify}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default AccountToolbar;
