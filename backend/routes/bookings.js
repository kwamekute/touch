const express = require("express");
const router = express.Router();
const {
  getbookings,
  addbookings,
  deletebookings,
  updatebookings,
} = require("../controllers/bookings");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getbookings);

router.route("/").post(addbookings);

router.route("/:id").put(updatebookings);

router.route("/:id").delete(protect, deletebookings);

module.exports = router;
