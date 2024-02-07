const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getCurrentUserOrder,
  createOrder,
} = require("../controllers/orderController");

router.route("/").put(authenticateUser, createOrder).get(authenticateUser, getCurrentUserOrder);

module.exports = router;
