const Booking = require("../models/Booking");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendMail");

//@desc get all bookings
//@route GET /api/bookings
//@access Protected
exports.getbookings = async (request, response, next) => {
  try {
    //getting all bookings and sorting for the most rescent first
    const bookings = await Booking.find().sort({ _id: -1 });

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

    try {
      await sendEmail({
        to: newBooking.email,
        subject: "New Booking Confirmation",
        template: "booking-confirmation",
        templateVars: {
          name: newBooking.name,
          roomType: newBooking.roomType,
          phone: newBooking.phone,
        },
      });

      response.status(201).json({
        status: "success",
        message: "Booking created Successfully",
        booking: newBooking,
      });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

//@desc Delete booking
//@route DELETE /api/bookings/:id
//@access Protected
exports.deletebookings = async (request, response, next) => {
  const id = request.params.id;
  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return next(new ErrorResponse("Booking with id doesn't exist", 400));
    }

    await Booking.deleteOne({ _id: id });

    return response.status(200).json({
      status: "success",
      message: "Booking deleted successfully",
      deletedBooking: booking,
    });
  } catch (error) {
    next(error);
  }
};

//@desc update Product
//@route UPDATE /api/bookings/:id
//@access Protected
exports.updatebookings = async (request, response, next) => {
  const id = request.params.id;
  const { status } = await request.body;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(new ErrorResponse("Booking with id doesn't exist", 400));
    }
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      { status },
      {
        new: true,
      }
    );

    return response.status(200).json({
      status: "success",
      message: "Booking Updated Successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};
