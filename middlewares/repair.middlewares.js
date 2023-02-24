const Repair = require("../models/repairs.models");
const User = require("../models/users.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.validIfExistRepair = catchAsync(async(req, res, next) => {
  const { userId } = req.body;
  
  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id: userId,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  
  if (!repair) {
    return next(new AppError("Repair not found", 404));
  }
  req.repair = repair;
next();
})