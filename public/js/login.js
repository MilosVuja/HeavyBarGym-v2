import axios from "axios";

export const login = async (email, pinCode) => {
  console.log(email, pinCode);
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/home/login',
      data: {
        email,
        pinCode
      }
    });

    if(res.data.status === 'Success!'){
      alert('Logged in successfully!');
      window.setTimeout(()=>{
        location.assign('/');
      }, 1000);
    }
  }catch(error){
    alert(error.response.data.message);
  }
}

export const logout = async() => {
  try{
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/home',
    });

    if(res.data.status === 'Success!') location.reload(true);
  }catch(error){
    alert('error', 'Error logging out! Try again!');
  }
}