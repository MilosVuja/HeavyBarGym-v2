const { default: mongoose } = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const sendEmail = require('./../utilities/email');

const gender = ["male", "female", "other"];
const exp = ["beginner", "intermediate", "advanced"];
const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, 'A first name must have less or equal then 20 characters!'],
    required: [true, 'Please provide your first name!']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, 'A last name must have less or equal then 20 characters!'],
    required: [true, 'Please provide your last name!']
  },
  email:{
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'PLease provide valid email!'],
    trim: true,
    unique: true
  },
  photo: String,
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member'
  },
  pinCode:{
    type: String,
    // required: [true, 'Please provide a pin code!'],//
    // minlength: 8,//
    select: false
  },
  // confirmPinCode:{
  //   type: String,
  //   required: [true, 'Please confirm your pin code!'],
  //   validate:{
  //     validator: function(el){
  //       return el === this.pinCode;
  //     },
  //     message: 'Pin Codes are not the same!'
  //   }
  // },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone number!']
  },
  sex:{
    type: String,
    enum: gender,
    default: 'other'
  },
  membership: String,
  training:{

  },
  measurements:{
    height: Number,
    weight: Number,
    bodyFat: Number,
    bmi: Number,
    waist: Number,
    arm: Number,
    thigh: Number
  },
  experiance:{
    type: String,
    enum: exp,
    default: 'beginner'
  },
  goal:{
    
  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  active:{
    type: Boolean,
    default: true,
    select: false
  }
});

memberSchema.pre('save', async function(next){
  let password = "";
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;

  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
  }
  console.log(password);
  this.pinCode = await bcrypt.hash(password, 12);

  this.confirmPinCode = undefined;
  
  // await sendEmail({
  //   email: 'milos.vujicic.dev@gmail.com',
  //   subject: 'Login informations',
  //   message: `This is your login password ${password}!`
  // })

  next();
})

memberSchema.pre(/^find/, function(next){
  this.find({active: {$ne: false}});
  next();
})

memberSchema.methods.correctPinCode = async function(candidatePinCode, memberPinCode){
  return await bcrypt.compare(candidatePinCode, memberPinCode);
}

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;