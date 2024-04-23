import '@babel/polyfill';
import { login, logout } from "./login";
import { updateData } from "./updateMember";


//dom elements
const loginForm = document.querySelector('.login-form');
const logOutBtn = document.querySelector('.logout_btn');
const updateMemberForm = document.querySelector('.update-member-form');


//delegation
if(loginForm)
  loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pinCode = document.getElementById('pinCode').value;
  login(email, pinCode);
})

if(logOutBtn) logOutBtn.addEventListener('click', logout);

if(updateMemberForm)
  updateMemberForm.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const photo = document.getElementById('photo').value;
    const phoneNumber = document.getElementById('tel').value;
    const address = document.getElementById('address').value;
    // const sex = document.getElementById('sex').value;
    const goal = document.getElementById('goal').value;
    const program = document.getElementById('program').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const bodyFat = document.getElementById('bfat').value;
    const bmi = document.getElementById('bmi').value;
    const waist = document.getElementById('waist').value;
    const arm = document.getElementById('arm').value;
    const thigh = document.getElementById('thigh').value;
    // const experiance = document.getElementById('').value;
    const squat = document.getElementById('squat').value;
    const bench = document.getElementById('bench').value;
    const deadlift = document.getElementById('deadlift').value;
    updateData(
      firstName,
      lastName,
      email,
      photo,
      phoneNumber,
      address,
      // sex,
      goal,
      program,
      height,
      weight,
      bodyFat,
      bmi,
      waist,
      arm,
      thigh,
      // experiance,
      squat,
      bench,
      deadlift);
})