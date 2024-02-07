const express = require("express")
const router = express.Router()
const {
  authenticateUser,
} = require("../middleware/authentication")

const {
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController")

router.route("/showUser").get(authenticateUser, showCurrentUser)
router.route("/updateUser").patch(authenticateUser, updateUser)
router.route("/updatePassword").patch(authenticateUser, updateUserPassword)

module.exports = router
