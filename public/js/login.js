
const logIn = async (email, pinCode) => {
  console.log(email, pinCode);
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/home',
      data: {
        email,
        pinCode
      }
    });
    console.log(res);
  }catch(error){
    console.log(error);
  }
}
const loginF = document.querySelector('.loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const pinCode = document.getElementById('pinCode').value;
  logIn({email, pinCode});
})
