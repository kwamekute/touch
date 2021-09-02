const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
  },

  email: {
    type: String,
    required: [true, "please provide a email address"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    minlength: 10,
  },

  roomType: {
    type: String,
    required: [true, "please provide room type"],
  },

  numberAdults: {
    type: String,
    required: [true, "please provide number of adults"],
  },

  numberChildren: {
    type: String,
    required: [true, "please provide number of children"],
  },

  checkIn: {
    type: String,
    required: [true, "please provide Checkin time"],
  },

  checkOut: {
    type: String,
    required: [true, "please provide Checkout time"],
  },

  status: {
    type: String,
    default: "Awaiting",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
