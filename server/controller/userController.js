import catchAsync from "./../utils/catchAsync.js";
import User from "./../models/userModel.js";
import { AppError } from "../utils/appError.js";
import APIFeatures from "../utils/APIFeatures.js";

export const getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
export const createUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "this route is not yet defined",
  });
};
export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("chatGroups");

  if (!user) {
    return next(new AppError("no user with that id found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
export const updateUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "this route is not yet defined",
  });
};
export const deleteUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "this route is not yet defined",
  });
};
