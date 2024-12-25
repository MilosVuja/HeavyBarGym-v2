const updateProfile = async (formData) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/home/updateMe",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.status === "Success!") {
      alert("Profile updated successfully!");
      window.setTimeout(() => {
        location.reload();
      }, 500);
    }
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Error updating profile. Please try again."
    );
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const profile = document.querySelector(".profile");
  const training = document.querySelector(".training-container");
  const training_btn = document.getElementById("training_btn");
  const imgDiv = document.querySelector(".profile_pic");
  const img = document.querySelector("#photo");
  const file = document.querySelector("#file");
  const exercise_card = document.querySelectorAll(".exercise-card");
  const modal_exercise = document.querySelector(".modal-exercise-back");
  const save_btn = document.querySelector(".save-btn");

  // Form submission handler
  const form = document.querySelector(".update-member-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData();

      const fields = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("tel").value,
        address: document.getElementById("address").value,
        sex: document.getElementById("sex").value,
        goal: document.getElementById("goal").value,
        program: document.getElementById("program").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        bodyFat: document.getElementById("bfat").value,
        bmi: document.getElementById("bmi").value,
        waist: document.getElementById("waist").value,
        arm: document.getElementById("arm").value,
        thigh: document.getElementById("thigh").value,
        experience: document.querySelector('input[name="experience"]:checked')
          ?.value,
        squat: document.getElementById("squat").value,
        bench: document.getElementById("bench").value,
        deadlift: document.getElementById("deadlift").value,
      };

      Object.entries(fields).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const fileInput = document.getElementById("file");
      if (fileInput.files[0]) {
        formData.append("photo", fileInput.files[0]);
      }

      await updateProfile(formData);
    });
  }

  if (training_btn) {
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

  if (file) {
    file.addEventListener("change", function () {
      const chosedFile = this.files[0];
      if (chosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(chosedFile);
      }
    });
  }

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

// Exercise functions
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
