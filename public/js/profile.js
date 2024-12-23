const profile=document.querySelector(".profile");
const training=document.querySelector(".training-container");
const training_btn=document.getElementById("training_btn");


const imgDiv=document.querySelector(".profile_pic");
const img=document.querySelector("#photo");
const file=document.querySelector("#file");


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

function updateField(element, type, increment) {
  const valueElement = element.closest(".counter").querySelector(".value");
  let currentValue = parseFloat(valueElement.value);

  // Prevent negative numbers
  if (currentValue + increment < 0) {
    currentValue = 0;
  } else {
    currentValue += increment;
  }

  valueElement.value = currentValue.toFixed(type === "weight" ? 1 : 0);
}

function copyRow(button) {
  const currentRow = button.closest(".exercise-row");
  const newRow = currentRow.cloneNode(true);
  currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
}

function deleteRow(button) {
  const currentRow = button.closest(".exercise-row");
  const rowsContainer = document.getElementById("rows-container");

  if (rowsContainer.children.length > 2) {
    currentRow.remove();
  }
}

function addRow() {
  const rowsContainer = document.getElementById("rows-container");
  const lastRow = rowsContainer.lastElementChild;
  const newRow = lastRow.cloneNode(true);

  const valueElements = newRow.querySelectorAll(".value");
  valueElements.forEach((value) => {
    value.value = 0;
  });

  rowsContainer.appendChild(newRow);
}
