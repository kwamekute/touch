const Booking = require("../models/Booking");
const ErrorResponse = require("../middleware/error");

//@desc get all bookings
//@route GET /api/bookings
//@access Protected
exports.getbookings = async (request, response, next) => {
  try {
    const bookings = await Booking.find();

    return response.status(200).json({
      status: "success",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

//@desc add bookings
//@route POST /api/bookings
//@access not Protected
exports.addbookings = async (request, response, next) => {
  const {
    name,
    email,
    phone,
    numberAdults,
    numberChildren,
    roomType,
    checkIn,
    checkOut,
  } = await request.body;
  try {
    const newBooking = await Booking.create({
      name,
      email,
      roomType,
      checkIn,
      checkOut,
      numberAdults,
      numberChildren,
      phone,
    });

    if (!newBooking) {
      return new ErrorResponse("something went worng please try again", 400);
    }

    response.status(200).json({
      status: "success",
      message: "booking created",
      Booking: newBooking,
    });
  } catch (error) {
    next(error);
  }
};

//@desc Delete booking
//@route DELETE /api/bookings/:id
//@access Protected
exports.deletebookings = (request, response, next) => {
  response.status(200).json({
    status: "success",
    message: "you have access to this route",
  });
};

//@desc update Product
//@route UPDATE /api/bookings/:id
//@access Protected
exports.updatebookings = (request, response, next) => {
  response.status(200).json({
    status: "success",
    message: "you have access to this route",
  });
};
