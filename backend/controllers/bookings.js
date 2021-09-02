const Booking = require("../models/Booking");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendMail");

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

    const message = `
    <h1>New Booking</h1>
    <p>Hello <b>${newBooking.name}</b>, <br> Your Booking for a <b>${newBooking.roomType}</b> has been recieved, we will contact you shortly on ${newBooking.phone}</p><br>
    <p>Thank You</p><br>
    `;

    try {
      await sendEmail({
        to: newBooking.email,
        subject: "New Booking",
        text: message,
      });

      response.status(201).json({
        status: "success",
        message: "Booking created Successfully",
        booking: newBooking,
      });
    } catch (error) {
      return next(new ErrorResponse("Email could not be sent", 500));
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
