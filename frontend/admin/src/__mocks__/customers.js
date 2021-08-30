import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    name: 'Ekaterina Tankova',
    email: 'ekaterina.tankova@devias.io',
    roomType: 'Delux',
    phone: '304-428-3097',
    arrival: '16/02/2021',
    departure: '20/02/2021',
    createdAt: 1555016400000,
    status: 'Awaiting'
  },
  {
    id: uuid(),
    email: 'ekaterina.tankova@devias.io',
    roomType: 'Presidential',
    name: 'Cao Yu',
    phone: '712-351-5711',
    arrival: '16/02/2021',
    departure: '20/02/2021',
    status: 'Awaiting',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    email: 'alexa.richardson@devias.io',
    roomType: 'Presidential',
    name: 'Alexa Richardson',
    phone: '770-635-2682',
    arrival: '16/02/2021',
    departure: '20/02/2021',
    status: 'Departed',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    roomType: 'Standard',
    phone: '908-691-3242',
    arrival: '16/02/2021',
    status: 'Canceled',
    departure: '20/02/2021',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    email: 'clarke.gillebert@devias.io',
    name: 'Clarke Gillebert',
    roomType: 'Delux Standard',
    phone: '972-333-4106',
    arrival: '16/02/2021',
    status: 'Arrived',
    departure: '20/02/2021',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    email: 'adam.denisov@devias.io',
    name: 'Adam Denisov',
    phone: '858-602-3409',
    roomType: 'Delux Twin Bed',
    status: 'Arrived',
    arrival: '16/02/2021',
    departure: '20/02/2021',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    email: 'ava.gregoraci@devias.io',
    name: 'Ava Gregoraci',
    phone: '415-907-2647',
    roomType: 'Delux Twin Bed',
    arrival: '16/02/2021',
    status: 'Arrived',
    departure: '20/02/2021',
    createdAt: 1554325200000
  },
  {
    id: uuid(),
    createdAt: 1523048400000,
    email: 'emilee.simchenko@devias.io',
    roomType: 'Delux',
    name: 'Emilee Simchenko',
    phone: '702-661-1654',
    status: 'Awaiting',
    arrival: '16/02/2021',
    departure: '20/02/2021'
  },
  {
    id: uuid(),
    createdAt: 1554702800000,
    roomType: 'Standard',
    email: 'kwak.seong.min@devias.io',
    name: 'Kwak Seong-Min',
    phone: '313-812-8947',
    status: 'Departed',
    arrival: '16/02/2021',
    departure: '20/02/2021'
  },
  {
    id: uuid(),
    createdAt: 1522702800000,
    roomType: 'Standard',
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894',
    status: 'Departed',
    arrival: '16/02/2021',
    departure: '20/02/2021'
  }
];
