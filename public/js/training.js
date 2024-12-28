document.addEventListener("DOMContentLoaded", () => {
  const exercise_card = document.querySelectorAll(".exercise-card");
  const modal_exercise = document.querySelector(".modal-exercise-back");
  exercise_card.forEach((elem) => {
    elem.addEventListener("click", () => {
      modal_exercise.style.display = "block";
    });
  });

  exercise_card.forEach((elem) => {
    elem.addEventListener("click", () => {
      modal_exercise.style.display = "block";
    });
  });

  window.onclick = function (event) {
    if (event.target == modal_exercise) {
      modal_exercise.style.display = "none";
    }
  };
});

window.updateField = function (element, type, increment) {
  const valueElement = element.closest(".counter").querySelector(".value");
  let currentValue = parseFloat(valueElement.value) || 0;

  if (currentValue + increment < 0) {
    currentValue = 0;
  } else {
    currentValue += increment;
  }

  valueElement.value = currentValue.toFixed(type === "weight" ? 1 : 0);
};

window.copyRow = function (button) {
  const currentRow = button.closest(".exercise-row");
  const newRow = currentRow.cloneNode(true);
  currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
};

window.deleteRow = function (button) {
  const currentRow = button.closest(".exercise-row");
  const rowsContainer = document.querySelector(".rows-container");

  if (rowsContainer.children.length > 2) {
    currentRow.remove();
  }
};

window.addRow = function () {
  const rowsContainer = document.querySelector(".rows-container");
  const lastRow = rowsContainer.lastElementChild;
  const newRow = lastRow.cloneNode(true);

  const valueElements = newRow.querySelectorAll(".value");
  valueElements.forEach((value) => {
    value.value = "0";
  });

  rowsContainer.appendChild(newRow);
};
