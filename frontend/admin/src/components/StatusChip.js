import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import { green, blue, grey, red } from '@material-ui/core/colors';

function colorForStatus(status) {
  switch (status) {
    case 'Departed':
      return green;
    case 'Arrived':
      return blue;
    case 'Canceled':
      return red;
    default:
      return grey;
  }
}

function StatusChip({ status }) {
  return (
    <Chip
      size="small"
      label={status}
      avatar={
        status === 'Departed' ? (
          <DoneAllOutlinedIcon style={{ color: 'white' }} />
        ) : status === 'Canceled' ? (
          <CancelOutlinedIcon style={{ color: 'white' }} />
        ) : status == 'Arrived' ? (
          <DoneIcon style={{ color: 'white' }} />
        ) : null
      }
      style={{ backgroundColor: colorForStatus(status)[600], color: 'white' }}
    />
  );
}

export default StatusChip;
