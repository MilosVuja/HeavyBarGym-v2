const card=document.querySelectorAll(".card");
const modal_purchasing=document.querySelector(".modal-purchasing");
const close=document.querySelector(".eks");
const login=document.querySelector(".login_btn");
const dropmenu=document.querySelector(".login");
const ham_links = document.querySelector(".nav-links");

const hamMenu = document.querySelector('.ham-menu');
hamMenu.addEventListener("click", ()=>{
  hamMenu.classList.toggle('active');
  ham_links.classList.toggle('active');
})

card.forEach((elem)=>{
  elem.addEventListener("click", ()=>{
    modal_purchasing.style.display="block";
  })
})

close.addEventListener("click", ()=>{
  modal_purchasing.style.display="none";
})
window.onclick = function(event) {
  if (event.target == modal_purchasing) {
    modal_purchasing.style.display = "none";
  }
}

login.addEventListener("click", ()=>{
  dropmenu.classList.toggle("active");
});