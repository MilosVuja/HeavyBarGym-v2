exerciseDb = document.querySelectorAll(".exercise-card");
program = document.querySelector(".program");
modal = document.querySelector(".modal-exercise-back");

brojac=1;
exerciseDb.forEach((el)=>{
  el.addEventListener("click", ()=>{
  let ele=el.cloneNode(true);
  ele.classList.add("program-card");
  program.append(ele);
  card = document.querySelectorAll(".program-card");
  card.forEach((elem)=>{
    elem.addEventListener("click", ()=>{
      modal.style.display="block";
    })
  })

  const remove=document.createElement("span");
  remove.textContent="remove";
  remove.classList.add("material-symbols-outlined", "delete");

  const numberExe=document.createElement("span");
  numberExe.textContent=brojac++;
  numberExe.classList.add("number-exercise");
  
  ele.append(remove);
  ele.append(numberExe);
  })
})