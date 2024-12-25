const Member = require("./../models/membersModel");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.getAllMembers = catchAsync(async (req, res) => {
  const members = await Member.find();

  res.status(200).json({
    status: "Success",
    results: members.length,
    data: {
      members,
    },
  });
});

exports.getMember = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This route isnt yet defined",
  });
};

exports.createMember = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This route isnt yet defined",
  });
};

exports.updateMember = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "photo",
    "phoneNumber",
    "address",
    "sex",
    "goal",
    "program",
    "height",
    "weight",
    "bodyFat",
    "bmi",
    "waist",
    "arm",
    "thigh",
    "experience",
    "squat",
    "bench",
    "deadlift"
  );
  const updatedMember = await Member.findByIdAndUpdate(
    req.member.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success!",
    data: {
      member: updatedMember,
    },
  });
});

exports.deleteMember = catchAsync(async (req, res, next) => {
  await Member.findByIdAndUpdate(req.member.id, { active: false });

  res.status(204).json({
    status: "Success!",
  });
});

exports.uploadMemberPhoto = upload.single("photo");

exports.resizeMemberPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const uploadDir = "public/images/members";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  req.file.filename = `member-${req.member.id}-${Date.now()}.jpeg`;
  const filePath = path.join(uploadDir, req.file.filename);

  try {
    await sharp(req.file.buffer)
      .rotate()
      .resize(500, 500, {
        fit: "cover",
        position: "center",
      })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(filePath);
  } catch (error) {
    return next(new AppError("Error uploading image. Please try again.", 500));
  }

  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "address",
    "sex",
    "goal",
    "program",
    "height",
    "weight",
    "bodyFat",
    "bmi",
    "waist",
    "arm",
    "thigh",
    "experience",
    "squat",
    "bench",
    "deadlift",
    "photo"
  );

  if (req.file) {
    filteredBody.photo = `images/members/${req.file.filename}`;
  }

  const updatedMember = await Member.findByIdAndUpdate(
    req.member.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success!",
    data: {
      member: updatedMember,
    },
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  res.status(200).render("profile", {
    title: "Your profile",
    member: req.member,
  });
});
