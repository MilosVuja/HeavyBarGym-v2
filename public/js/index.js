import { login, logout } from "./login";


//dom elements
const loginForm = document.querySelector('.login-form');
const logOutBtn = document.querySelector('.logout_btn');

//delegation
if(loginForm)
  loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pinCode = document.getElementById('pinCode').value;
  login(email, pinCode);
})

if(logOutBtn) logOutBtn.addEventListener('click', logout);