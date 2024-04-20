const Member = require('./../models/membersModel');
const catchAsync = require('../utilities/catchAsync');


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  })
return newObj;
}

exports.getAllMembers = catchAsync (async (req, res) => {
  const members = await Member.find();

  res.status(200).json({
    status: 'Success',
    results: members.length,
    data: {
      members
    }
  })
})

exports.getMember = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route isnt yet defined'
  })
}

exports.createMember = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route isnt yet defined'
  })
}

exports.updateMember = catchAsync (async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'firstName', 'email');
  const updatedMember = await Member.findByIdAndUpdate(req.member.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'Success!',
    data: {
      member: updatedMember
    }
  })
})

exports.deleteMember = catchAsync (async (req, res, next) => {
  await Member.findByIdAndUpdate(req.member.id, {active: false})

  res.status(204).json({
    status: 'Success!'
  })
})