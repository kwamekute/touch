const moment = require("moment");
const Booking = require("../models/Booking");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendMail");

//@desc get all bookings
//@route GET /api/bookings
//@access Protected
exports.getbookings = async (request, response, next) => {
  const query = request.query;

  //filter out all empty fields from query object
  for (var i in query) {
    if (query[i] === "" || query[i] === "undefined" || query[i] === "null") {
      delete query[i];
    }
  }

  try {
    //getting all bookings and sorting for the most rescent first

    const bookings = await Booking.find(query).sort({ _id: -1 }).lean();

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
          dateBooked: moment(newBooking.createdAt).format("MMMM Do YYYY"),
          checkIn: moment(newBooking.checkIn, "DD/MM/YYYY").format(
            "MMMM Do YYYY"
          ),
          checkOut: moment(newBooking.checkOut, "DD/MM/YYYY").format(
            "MMMM Do YYYY"
          ),
          guests: parseInt(numberAdults) + parseInt(numberChildren),
          bookingId: newBooking._id.toString().slice(0, 6),
          url: "https://francisjun.github.io/touch/frontend/index.html",
          imgUrl: `${process.env.SERVER_URL}rooms/${newBooking.roomType
            .split(" ")
            .join("-")}.jpg`,
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

exports.getStats = async (request, response, next) => {
  const bookings = await Booking.estimatedDocumentCount();

  try {
    // re-write this to use aggregators
    const percentage_increase_canceled = await Booking.find(
      { status: "Canceled" },
      {
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59)),
        },
      }
    ).countDocuments();
    const percentage_increase_departed = await Booking.find(
      { status: "Departed" },
      {
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0)),
          $lte: new Date(new Date().setHours(23, 59, 59)),
        },
      }
    ).countDocuments();

    // Bookings collection must have at least one record for the agregations below to work.: TODO find a better alternative
    const [{ total_canceled }] = await Booking.aggregate([
      {
        $facet: {
          not_found: [
            {
              $project: {
                _id: "Canceled",
                total_canceled: { $const: 0 },
              },
            },
            {
              $limit: 1,
            },
          ],
          found: [
            {
              $match: {
                status: "Canceled",
              },
            },
            {
              $group: {
                _id: "$status",
                total_canceled: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$not_found", 0],
              },
              {
                $arrayElemAt: ["$found", 0],
              },
            ],
          },
        },
      },
    ]);

    const [{ total_arrived }] = await Booking.aggregate([
      {
        $facet: {
          not_found: [
            {
              $project: {
                _id: "Arrived",
                total_arrived: { $const: 0 },
              },
            },
            {
              $limit: 1,
            },
          ],
          found: [
            {
              $match: {
                status: "Arrived",
              },
            },
            {
              $group: {
                _id: "$status",
                total_arrived: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$not_found", 0],
              },
              {
                $arrayElemAt: ["$found", 0],
              },
            ],
          },
        },
      },
    ]);
    const [{ total_pending }] = await Booking.aggregate([
      {
        $facet: {
          not_found: [
            {
              $project: {
                _id: "Awaiting",
                total_pending: { $const: 0 },
              },
            },
            {
              $limit: 1,
            },
          ],
          found: [
            {
              $match: {
                status: "Awaiting",
              },
            },
            {
              $group: {
                _id: "$status",
                total_pending: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$not_found", 0],
              },
              {
                $arrayElemAt: ["$found", 0],
              },
            ],
          },
        },
      },
    ]);

    const [{ total_departed }] = await Booking.aggregate([
      {
        $facet: {
          not_found: [
            {
              $project: {
                _id: "Departed",
                total_departed: { $const: 0 },
              },
            },
            {
              $limit: 1,
            },
          ],
          found: [
            {
              $match: {
                status: "Departed",
              },
            },
            {
              $group: {
                _id: "$status",
                total_departed: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$not_found", 0],
              },
              {
                $arrayElemAt: ["$found", 0],
              },
            ],
          },
        },
      },
    ]);

    // console.log("total_canceled", total_canceled);
    // console.log("total_departed", total_departed);
    // console.log("total_arrived", total_arrived);
    // console.log("total_pending", total_pending);
    // console.log("bookings", bookings);
    // console.log("percentage_increase_canceled", percentage_increase_canceled);
    // console.log("percentage_increase_departed", percentage_increase_departed);

    const stats = {
      total_arrived,
      total_pending,
      total_canceled,
      canceled_percentage_difference: `${(
        (percentage_increase_canceled / bookings) *
        100
      ).toFixed(0)}`,
      total_departed,
      departed_percentage_difference: `${(
        (percentage_increase_departed / bookings) *
        100
      ).toFixed(0)}`,
    };

    return response.status(200).json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};
