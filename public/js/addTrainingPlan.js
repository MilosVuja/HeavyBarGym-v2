let selectedMuscles = [];

function addMuscleClickListeners() {
  const musclePaths = document.querySelectorAll(".muscle");
  musclePaths.forEach((path) => {
    path.addEventListener("click", async function () {
      const latinName = this.getAttribute("data-muscle");
      try {
        const response = await fetch(`/api/v1/muscles/latin/${latinName}`);
        const muscleData = await response.json();

        document.getElementById("muscle-name-value").textContent =
          muscleData.name;
        document.getElementById("latin-name-value").textContent =
          muscleData.latinName;
        document.getElementById("muscle-desc-value").textContent =
          muscleData.description;
        document.getElementById("muscle-movements-value").textContent =
          muscleData.movements;

        musclePaths.forEach((p) => p.classList.remove("highlighted"));
        this.classList.add("highlighted");
      } catch (error) {
        console.error("Error fetching muscle data:", error);
      }
    });
  });

  document
    .getElementById("add-muscle-button")
    .addEventListener("click", function () {
      const muscleName =
        document.getElementById("muscle-name-value").textContent;

      if (muscleName) {
        const alreadySelected = Array.from(musclePaths).some(
          (path) =>
            path.classList.contains("filled") &&
            path.getAttribute("data-name") === muscleName
        );

        if (alreadySelected) {
          alert("This muscle has already been added.");
          return;
        }

        const selectedMuscle = Array.from(musclePaths).filter(
          (path) => path.getAttribute("data-name") === muscleName
        );

        selectedMuscle.forEach((path) => {
          path.classList.add("filled");
        });

        selectedMuscles.push({ name: muscleName });
        updateSelectedMusclesList();
      } else {
        console.error("No muscle selected to add.");
      }
    });
}

function updateSelectedMusclesList() {
  const selectedMusclesList = document.getElementById("selected-muscles-list");
  selectedMusclesList.innerHTML = "";

  selectedMuscles.forEach((muscle, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = muscle.name;

    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("remove-muscle-button");
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", function () {
      removeMuscle(index);
    });

    listItem.appendChild(removeButton);
    selectedMusclesList.appendChild(listItem);
  });
}

function removeMuscle(index) {
  const muscleName = selectedMuscles[index].name;

  selectedMuscles.splice(index, 1);

  const musclePath = Array.from(document.querySelectorAll(".muscle")).find(
    (path) => path.getAttribute("data-name") === muscleName
  );

  if (musclePath) {
    musclePath.classList.remove("filled");
  }

  updateSelectedMusclesList();
}

function updateTrainingDates() {
  const duration = parseInt(document.getElementById("duration").value);
  const startDateInput = document.getElementById("weekStart").value;

  if (duration && startDateInput) {
    const startDate = new Date(startDateInput);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration * 7);

    const trainingDatesParagraph = document.getElementById("training-dates");
    trainingDatesParagraph.textContent = `Training starts on ${formatDate(
      startDate
    )} and ends on ${formatDate(endDate)}.`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addMuscleClickListeners();

  document
    .getElementById("choose-exercises-button")
    .addEventListener("click", setupContainersAndFetchExercises);
});

function setupContainersAndFetchExercises() {
  const muscleNames = selectedMuscles.map((muscle) => muscle.name);

  if (muscleNames.length === 0) {
    alert("Please select at least one muscle.");
    return;
  }

  let exercisesContainer = document.getElementById("exercises-container");
  let chosenExercisesContainer = document.getElementById("chosen-exercises");
  const selectExercises = document.getElementById("select-exercises");

  if (!exercisesContainer) {
    exercisesContainer = document.createElement("div");
    exercisesContainer.id = "exercises-container";
    exercisesContainer.classList.add("container");
    exercisesContainer.style.cssText = `
      border: 2px dashed #ccc;
      padding: 16px;
      margin: 16px;
      min-height: 200px;
    `;
    selectExercises.appendChild(exercisesContainer);
  }

  if (!chosenExercisesContainer) {
    chosenExercisesContainer = document.createElement("div");
    chosenExercisesContainer.id = "chosen-exercises";
    chosenExercisesContainer.classList.add("container");
    chosenExercisesContainer.style.cssText = `
      border: 2px dashed #ccc;
      padding: 16px;
      margin: 16px;
      min-height: 200px;
    `;
    selectExercises.appendChild(chosenExercisesContainer);
  }

  fetchAndDisplayExercises();
}

function fetchAndDisplayExercises() {
  const muscleNames = selectedMuscles.map((muscle) => muscle.name);
  const queryString = `muscles=${encodeURIComponent(
    JSON.stringify(muscleNames)
  )}`;

  fetch(`/api/v1/exercises?${queryString}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        displayExercises(data.groupedExercises);
      } else {
        alert(data.message || "Failed to fetch exercises.");
      }
    })
    .catch(() => {
      alert("An error occurred while fetching exercises.");
    });
}

function displayExercises(groupedExercises) {
  const exercisesContainer = document.getElementById("exercises-container");
  exercisesContainer.innerHTML = "";

  if (!groupedExercises || groupedExercises.length === 0) {
    exercisesContainer.textContent =
      "No exercises found for the selected muscles.";
    return;
  }

  groupedExercises.forEach((group) => {
    const muscleHeader = document.createElement("h2");
    muscleHeader.textContent = group.muscle;
    exercisesContainer.appendChild(muscleHeader);

    group.exercises.forEach((exercise) => {
      const exerciseCard = document.createElement("div");
      exerciseCard.classList.add("exercise-card");
      exerciseCard.setAttribute("draggable", "true");
      exerciseCard.setAttribute("data-name", exercise.name);
      exerciseCard.setAttribute("data-video", exercise.video);
      exerciseCard.setAttribute("data-instruction", exercise.instruction);

      exerciseCard.innerHTML = `
      <h3>${exercise.name}</h3>
      <img 
        src="${exercise.thumbnail}" 
        alt="Thumbnail for ${exercise.name}" 
        width="300" 
        height="200"
        style="object-fit: cover; border-radius: 8px;" 
      />
    `;

      exercisesContainer.appendChild(exerciseCard);

      exerciseCard.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/html", exerciseCard.outerHTML);
        e.dataTransfer.effectAllowed = "copy";
      });
    });
  });
}

function addDeleteButton(card) {
  const deleteButton = document.createElement("div");
  deleteButton.textContent = "-";
  deleteButton.classList.add("delete-button");
  deleteButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    display: none;
    background-color: red;
    color: white;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
  `;

  card.style.position = "relative";

  card.addEventListener("mouseenter", () => {
    deleteButton.style.display = "block";
  });

  card.addEventListener("mouseleave", () => {
    deleteButton.style.display = "none";
  });

  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    card.remove();
  });

  card.appendChild(deleteButton);
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    const dropTarget = e.target;

    if (dropTarget.id === "chosen-exercises" && e.dataTransfer) {
      const droppedHTML = e.dataTransfer.getData("text/html");
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = droppedHTML;

      const newCard = tempDiv.firstChild;
      newCard.classList.remove("dragging");
      newCard.setAttribute("draggable", "false");

      if (!isDuplicate(newCard)) {
        addDeleteButton(newCard);
        dropTarget.appendChild(newCard);
      } else {
        alert("This exercise is already added!");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let chosenExercisesContainer = document.querySelector("#chosen-exercises");

  const initializeDragAndDrop = () => {
    if (!chosenExercisesContainer) return;

    let draggedCard = null;

    const makeCardsDraggable = () => {
      chosenExercisesContainer
        .querySelectorAll(".exercise-card")
        .forEach((card) => {
          card.draggable = true;
        });
    };

    chosenExercisesContainer.addEventListener("dragstart", (event) => {
      const card = event.target.closest(".exercise-card");
      if (card) {
        draggedCard = card;
        draggedCard.style.opacity = "0.5";
        event.dataTransfer.effectAllowed = "move";
      }
    });

    chosenExercisesContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
      const targetCard = event.target.closest(".exercise-card");
      if (targetCard && targetCard !== draggedCard) {
        const bounding = targetCard.getBoundingClientRect();
        const offset = event.clientY - bounding.top;

        if (offset > bounding.height / 2) {
          targetCard.after(draggedCard);
        } else {
          targetCard.before(draggedCard);
        }
      }
    });

    chosenExercisesContainer.addEventListener("dragend", () => {
      if (draggedCard) {
        draggedCard.style.opacity = "1";
        draggedCard = null;
      }
    });

    makeCardsDraggable();
  };

  const initializeChosenExercises = () => {
    chosenExercisesContainer = document.querySelector("#chosen-exercises");

    if (chosenExercisesContainer) {
      initializeDragAndDrop();
    } else {
      setTimeout(initializeChosenExercises, 100);
    }
  };

  initializeChosenExercises();

  window.addCard = function () {
    if (!document.querySelector("#chosen-exercises")) {
      return;
    }

    const card = document.createElement("div");
    card.classList.add("exercise-card");
    card.setAttribute("draggable", "true");
    card.innerHTML = "<p>New Exercise Card</p>";
    document.querySelector("#chosen-exercises").appendChild(card);

    initializeChosenExercises();
  };
});

function isDuplicate(newCard) {
  const chosenExercisesContainer = document.getElementById("chosen-exercises");
  const chosenCards = Array.from(chosenExercisesContainer.children);

  return chosenCards.some(
    (card) =>
      card.querySelector("h3").textContent ===
      newCard.querySelector("h3").textContent
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const modal_exercise = document.querySelector(".modal-exercise-back");

  const interval = setInterval(() => {
    const chosenExercisesContainer =
      document.querySelector("#chosen-exercises");

    if (chosenExercisesContainer) {
      clearInterval(interval);

      if (modal_exercise) {
        chosenExercisesContainer.addEventListener("click", (event) => {
          const card = event.target.closest(".exercise-card");
          if (card) {
            modal_exercise.style.display = "block";

            const name = card.getAttribute("data-name");
            const video = card.getAttribute("data-video");
            const instruction = card.getAttribute("data-instruction");

            document.querySelector(".modal-exercise-name").textContent = name;
            document.querySelector(".modal-exercise-instruction").textContent =
              instruction;

            const iframe = document.querySelector(".video iframe");
            iframe.src = video;
          }
        });
      }
    }
  }, 100);

  window.onclick = function (event) {
    if (event.target == modal_exercise) {
      modal_exercise.style.display = "none";
    }
  };
  const rowsContainer = document.querySelector(".rows-container");
  if (rowsContainer) {
    let draggedRow = null;

    rowsContainer.addEventListener("dragstart", (event) => {
      if (event.target.classList.contains("exercise-row")) {
        draggedRow = event.target;
        event.target.style.opacity = "0.5";
        event.dataTransfer.effectAllowed = "move";
      }
    });

    rowsContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
      const targetRow = event.target.closest(".exercise-row");

      if (targetRow && targetRow !== draggedRow) {
        const bounding = targetRow.getBoundingClientRect();
        const offset = event.clientY - bounding.top;

        if (offset > bounding.height / 2) {
          targetRow.after(draggedRow);
        } else {
          targetRow.before(draggedRow);
        }
      }
    });

    rowsContainer.addEventListener("dragend", () => {
      if (draggedRow) {
        draggedRow.style.opacity = "1";
        draggedRow = null;
      }
    });

    function makeRowsDraggable() {
      document.querySelectorAll(".exercise-row").forEach((row) => {
        row.draggable = true;
      });
    }

    makeRowsDraggable();

    window.copyRow = function (button) {
      const currentRow = button.closest(".exercise-row");
      const newRow = currentRow.cloneNode(true);
      currentRow.parentNode.insertBefore(newRow, currentRow.nextSibling);
      makeRowsDraggable();
    };

    window.addRow = function () {
      const lastRow = rowsContainer.lastElementChild;
      if (lastRow) {
        const newRow = lastRow.cloneNode(true);
        newRow.querySelectorAll(".value").forEach((value) => {
          value.value = 0;
        });
        rowsContainer.appendChild(newRow);
        makeRowsDraggable();
      }
    };

    window.deleteRow = function (button) {
      const currentRow = button.closest(".exercise-row");
      const totalRows = rowsContainer.querySelectorAll(".exercise-row").length;

      if (totalRows > 2) {
        currentRow.remove();
      } else {
        alert("At least one exercise row must exist.");
      }
    };

    window.updateField = function (element, type, increment) {
      const valueElement = element.closest(".counter").querySelector(".value");
      let currentValue = parseFloat(valueElement.value);

      if (currentValue + increment < 0) {
        currentValue = 0;
      } else {
        currentValue += increment;
      }

      valueElement.value = currentValue.toFixed(type === "weight" ? 1 : 0);
    };
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const daySelect = document.getElementById("day-select");
  const heading = document.getElementById("muscle-selection-heading");

  daySelect.addEventListener("change", function () {
    heading.textContent = `Muscle Selection for ${this.value}`;
  });
});

function saveExercise() {
  const exerciseName = document.querySelector(".modal-exercise-name").textContent;
  const exerciseVideo = document.querySelector(".iframe").src;

  const exercise = {
    name: exerciseName,
    video: exerciseVideo,
    instructions: document.querySelector(".modal-exercise-instruction").value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value,
    rest: document.getElementById("rest").value,
  };

  let trainingPlan = JSON.parse(localStorage.getItem("trainingPlan")) || { trainingDays: [] };

  const selectedDay = document.getElementById("day-select").value;

  let trainingDay = trainingPlan.trainingDays.find((day) => day.day === selectedDay);
  if (!trainingDay) {
    trainingDay = { day: selectedDay, trainingType: "", exercises: [] };
    trainingPlan.trainingDays.push(trainingDay);
  }

  trainingDay.exercises.push(exercise);

  localStorage.setItem("trainingPlan", JSON.stringify(trainingPlan));

  alert("Exercise saved to training plan!");

  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("rest").value = "";

}

async function saveTrainingPlan(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const duration = document.getElementById("duration").value;
  const trainingsPerWeek = document.getElementById("times-per-week").value;
  const weekStart = document.getElementById("weekStart").value;

  const trainingPlan = JSON.parse(localStorage.getItem("trainingPlan"));
  const trainingDays = trainingPlan?.trainingDays || [];
  const amountOfTrainings = trainingDays.length;

  if (amountOfTrainings === 0) {
    alert("Please add exercises to your training plan first.");
    return;
  }

  const trainingData = {
    name,
    description,
    duration,
    trainingsPerWeek,
    weekStart,
    amountOfTrainings,
    trainingDays,
  };

  try {
    const saveButton = document.querySelector(".save-training-plan");
    saveButton.disabled = true;

    const response = await fetch("/api/v1/training-plans/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainingData),
    });

    if (!response.ok) throw new Error("Failed to save training plan.");

    alert("Training plan saved successfully!");
    localStorage.removeItem("trainingPlan");
    saveButton.disabled = false;
  } catch (error) {
    alert("Error saving training plan.");
    saveButton.disabled = false;
  }
}

document.querySelector(".save-training-plan").addEventListener("click", saveTrainingPlan);

