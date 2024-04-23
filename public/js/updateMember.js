import axios from "axios";

export const updateData = async(
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  // sex,
  goal,
  program,
  height,
  weight,
  bfat,
  bmi,
  waist,
  arm,
  thigh,
  // experiance,
  squat,
  bench,
  deadlift) => {
    try{
      const res = await axios({
        method: 'PATCH',
        url: 'http://127.0.0.1:3000/api/v1/home/profile',
        data:{
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
          deadlift
        }
      })

      if(res.data.status === 'Success!'){
        alert('success', 'Data updated successfully!');
      }

    }catch(error){
      alert('error', error.response.data.message);
    }
}