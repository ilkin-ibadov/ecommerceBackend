const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createUserToken } = require("../utils");

// Register User
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password, role });
  // Create user token
  const userToken = createUserToken(user);
  res.status(StatusCodes.CREATED).json({ user: userToken });
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw CustomError.UnauthorizedError("No user found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const userToken = createUserToken(user);

  res
    .status(StatusCodes.OK)
    .json({ user: userToken, msg: "Login successful!" });
};

module.exports = {
  register,
  login,
};
