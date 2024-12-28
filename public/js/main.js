const card = document.querySelectorAll(".card");
const modal_purchasing = document.querySelector(".modal-purchasing");
const close = document.querySelector(".eks");
const ham_links = document.querySelector(".nav-links");

const hamMenu = document.querySelector(".ham-menu");
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  ham_links.classList.toggle("active");
});

card.forEach((elem) => {
  elem.addEventListener("click", () => {
    modal_purchasing.style.display = "block";
  });
});

close.addEventListener("click", () => {
  modal_purchasing.style.display = "none";
});
window.onclick = function (event) {
  if (event.target == modal_purchasing) {
    modal_purchasing.style.display = "none";
  }
};

const UserLogout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/members/logout",
    });

    if (res.data.status === "Success!") {
      alert("Logged out successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (error) {
    alert("Error logging out! Try again!");
  }
};
const logoutButton = document.querySelector(".logout_btn");
if (logoutButton) {
  logoutButton.addEventListener("click", UserLogout);
}