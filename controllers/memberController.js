const Member = require('./../models/membersModel');
const catchAsync = require('../utilities/catchAsync');


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

exports.updateMember = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route isnt yet defined'
  })
}

exports.deleteMember = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route isnt yet defined'
  })
}