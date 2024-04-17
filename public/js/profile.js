const profile=document.querySelector(".profile");
const training=document.querySelector(".training-container");
const training_btn=document.getElementById("training_btn");


const imgDiv=document.querySelector(".profile_pic");
const img=document.querySelector("#photo");
const file=document.querySelector("#file");
const upload_pic=document.querySelector("#upload_pic");


const exercise_card=document.querySelectorAll(".exercise-card");
const modal_exercise=document.querySelector(".modal-exercise-back");
const save_btn=document.querySelector(".save-btn");

training_btn.addEventListener("click", ()=>{
  if(training.style.display==="none"){
    training_btn.textContent="Profile";
    training.style.display="block";
    profile.style.display="none";
  }else{
    training_btn.textContent="Training";
    training.style.display="none";
    profile.style.display="block";
  }
});

file.addEventListener("change", function(){
  const chosedFile=this.files[0];
  if(chosedFile){
    const reader = new FileReader();
    reader.addEventListener("load", function(){
      img.setAttribute("src", reader.result);
    })
    reader.readAsDataURL(chosedFile);
  }
})

exercise_card.forEach((elem)=>{
  elem.addEventListener("click", ()=>{
    modal_exercise.style.display="block";
  })
})
window.onclick = function(event) {
  if (event.target == modal_exercise) {
    modal_exercise.style.display = "none";
  }
}

const column = document.querySelectorAll(".column");
const addDel = document.querySelector(".add-delete");
let addRow = document.querySelectorAll('.addRow');


addRow.forEach((elem)=>{
  elem.addEventListener('click', ()=>{
    column.forEach((ele)=>{
      let newAdjust = document.createElement("div");
      newAdjust.classList.add("adjust");
      let newInput = document.createElement('input');
      newInput.type='text';
      newInput.placeholder='0';
      newInput.name='bogzna';
      let newSpanPlus = document.createElement('span');
      let newIPlus = document.createElement('i');
      newIPlus.classList.add('fa-regular', 'fa-plus');
      let newSpanMinus = document.createElement('span');
      let newIMinus = document.createElement('i');
      newIMinus.classList.add('fa-solid', 'fa-minus');
      ele.appendChild(newAdjust);
      newAdjust.appendChild(newInput);
      newAdjust.appendChild(newSpanPlus);
      newAdjust.appendChild(newSpanMinus);
      newSpanPlus.appendChild(newIPlus);
      newSpanMinus.appendChild(newIMinus);
    })

    let newIcons = document.createElement('div');
    newIcons.classList.add('icons');
    let newSpanPlusIcon = document.createElement('span');
    let newIPlusIcon = document.createElement('i');
    newIPlusIcon.classList.add('fa-regular', 'fa-plus', 'white', 'addRow');
    let newSpanMinusIcon = document.createElement('span');
    let newIMinusIcon = document.createElement('i');
    newIMinusIcon.classList.add('fa-solid', 'fa-trash', 'white', 'deleteRow');
    addDel.appendChild(newIcons);
    newIcons.appendChild(newSpanPlusIcon);
    newIcons.appendChild(newSpanMinusIcon);
    newSpanPlusIcon.appendChild(newIPlusIcon);
    newSpanMinusIcon.appendChild(newIMinusIcon);
    const deleteRow = document.querySelectorAll(".deleteRow");
    deleteRow.forEach((el)=>{
      el.addEventListener('click', ()=>{
        newAdjust.remove();
        newIcons.remove();
      })
    })
  })
})


const icons = document.querySelector(".icons");
const plus = document.querySelectorAll(".fa-plus");
const minus = document.querySelectorAll("fa-minus");
const input = document.querySelectorAll("input")