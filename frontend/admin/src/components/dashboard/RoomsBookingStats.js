import { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider
} from '@material-ui/core';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import { GlobalContext } from 'src/context/GlobalState';

const ROOM_BUCKETS = {
  Presidential: 'Presidential Suite',
  Standard: 'Standard Room',
  DeluxT: 'Delux Twin Bed Room',
  DeluxeS: 'Deluxe Standard Room',
  Deluxe: 'Deluxe Room'
};

function RoomsBookingStats() {
  const { bookings } = useContext(GlobalContext);

  const output = {};

  for (const bucket in ROOM_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (current.roomType === ROOM_BUCKETS[bucket]) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    output[bucket] = filteredBookingsCount;
  }

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: [
      'Presidential Suite',
      'Standard Room',
      'Delux Twin Bed Room',
      'Deluxe Standard Room',
      'Deluxe Room'
    ],
    datasets: [
      {
        data: Object.values(output),
        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
  return (
    <Card>
      <CardHeader title="Rooms Bookings Stats" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Pie data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default RoomsBookingStats;
