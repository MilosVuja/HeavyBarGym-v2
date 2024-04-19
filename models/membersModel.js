const { default: mongoose } = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

const GENDERS = ["male", "female", "other"];
const EXP = ["beginner", "intermediate", "advanced"];
const roles = ['member', 'admin']
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
    enum: roles,
    default: 'member'
  },
  pinCode:{
    type: String,
    required: [true, 'Please provide a pin code!'],
    minlength: 8,
    select: false
  },
  confirmPinCode:{
    type: String,
    required: [true, 'Please confirm your pin code!'],
    validate:{
      validator: function(el){
        return el === this.pinCode;
      },
      message: 'Pin Codes are not the same!'
    }
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone number!']
  },
  sex:{
    type: String,
    enum: GENDERS,
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
    enum: EXP,
    default: 'beginner'
  },
  goal:{
    
  },
  createdAt:{
    type: Date,
    default: Date.now()
  }
});


memberSchema.pre('save', async function(next){
  if(this.isModified('pinCOde')) return next();

  this.pinCode = await bcrypt.hash(this.pinCode, 12);

  this.confirmPinCode = undefined;
  next();
})

memberSchema.methods.correctPinCode = async function(candidatePinCode, memberPinCode){

  return await bcrypt.compare(candidatePinCode, memberPinCode);
}

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;