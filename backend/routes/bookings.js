const express = require("express");
const router = express.Router();
const {
  getbookings,
  addbookings,
  deletebookings,
  updatebookings,
  getStats,
} = require("../controllers/bookings");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getbookings);

router.route("/stats").get(protect, getStats);

router.route("/").post(addbookings);

router.route("/:id").put(protect, updatebookings);

router.route("/:id").delete(protect, deletebookings);

module.exports = router;
