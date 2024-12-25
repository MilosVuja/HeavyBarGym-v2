import "@babel/polyfill";
import { login, logout } from "./login";
import { updateProfile } from "./profile";

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Only run profile code if we're on the profile page
  if (document.querySelector(".profile")) {
    const training_btn = document.getElementById("training_btn");
    if (training_btn) {
      const profile = document.querySelector(".profile");
      const training = document.querySelector(".training-container");

      training_btn.addEventListener("click", () => {
        if (training.style.display === "none") {
          training_btn.textContent = "Profile";
          training.style.display = "block";
          profile.style.display = "none";
        } else {
          training_btn.textContent = "Training";
          training.style.display = "none";
          profile.style.display = "block";
        }
      });
    }
  }
});

window.updateField = function (element, type, increment) {
  const valueElement = element.closest(".counter").querySelector(".value");
  let currentValue = parseFloat(valueElement.value) || 0;
  currentValue = Math.max(0, currentValue + increment);
  valueElement.value = currentValue.toFixed(type === "weight" ? 1 : 0);
};

window.copyRow = function (button) {
  const currentRow = button.closest(".exercise-row");
  if (currentRow) {
    const newRow = currentRow.cloneNode(true);
    currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
  }
};

window.deleteRow = function (button) {
  const currentRow = button.closest(".exercise-row");
  const rowsContainer = document.querySelector(".rows-container");
  if (rowsContainer && rowsContainer.children.length > 2) {
    currentRow.remove();
  }
};

window.addRow = function () {
  const rowsContainer = document.querySelector(".rows-container");
  if (rowsContainer) {
    const lastRow = rowsContainer.lastElementChild;
    if (lastRow) {
      const newRow = lastRow.cloneNode(true);
      const valueElements = newRow.querySelectorAll(".value");
      valueElements.forEach((value) => (value.value = "0"));
      rowsContainer.appendChild(newRow);
    }
  }
};
