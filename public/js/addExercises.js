document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addExerciseForm");

  form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
          alert("Please fill out all required fields.");
          return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
          const response = await fetch("/api/v1/exercises/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });

          const result = await response.json();

          if (response.ok) { 
              alert("Exercise added successfully!");
              form.reset();
              // window.location.href = "/exercises";
          } else {
              alert(result.message || "An error occurred while adding the exercise.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An unexpected error occurred.");
      }
  });
});