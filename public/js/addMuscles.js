document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addMuscleForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    delete data.exercises;

    try {
      const response = await fetch("/api/v1/muscles/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Muscle added successfully!");
        form.reset();
      } else {
        alert(result.message || "An error occurred while adding the muscle.");
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    }
  });
});
