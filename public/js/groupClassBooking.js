dayWeek = document.querySelectorAll(".dayWeek");
date = document.querySelectorAll(".date");
td = document.querySelectorAll("td");
book = document.querySelector(".modal-booking");
eks = document.querySelector(".close");





current = new Date();
// current.setDate((current.getDate() - current.getDay() +1));
const daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dayWeek[0].textContent = daysWeek[current.getDay()];
date[0].textContent = current.getDate() + ". " + months[current.getMonth()];
for (let i = 1; i < 7; i++) {
  current.setDate(current.getDate()+1);
  dayWeek[i].textContent = daysWeek[current.getDay()];
  date[i].textContent = current.getDate() + ". " + months[current.getMonth()];
}

proba = new Date();
proba.setDate(proba.getDate());

if(proba.getHours() == 22 &&
    proba.getMinutes() == 56){
      move();
      console.log(proba);
    }
    
function move() {
  let table = document.querySelector("table");
  let tr = table.rows;
  for (let i = 1; i < tr.length; i++) {
    tr[i].appendChild(tr[i].firstElementChild);
  }
}


// function pickATimeOfDay(hour, minutes){
//   const twentyFourHours = 86400000;
//   let newDay=new Date();
//   let untilMidnight = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate(), hour, minutes, 35, 0).getTime() - newDay;
//   if (untilMidnight < 0)
//   {
//     untilMidnight += twentyFourHours;
//   }
//   setTimeout(()=> {
//     move();
//     setInterval(move, twentyFourHours);
//   }, untilMidnight);
// }
// pickATimeOfDay(1,2,() => {
//   move();
// });

