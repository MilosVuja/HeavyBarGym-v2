async function fetchTrainingPlan() {
  try {
    const response = await fetch(`/api/v1/training-plans/active`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const result = await response.json();
    console.log("Training Plan Data:", result); 

    if (result.status === "success" && result.data) {
      renderTrainingPlan(result.data.activePlan);
    } else {
      console.error("No training plan found");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function renderTrainingPlan(plan) {
  const container = document.getElementById("training-plan-container");
  container.innerHTML = `
    <h2>${plan.name}</h2>
    <div class="training">
      <div class="training-informations">
        <p>${plan.description}</p>
        <p>Duration: ${plan.duration} min</p>
        <p>Trainings per Week: ${plan.trainingsPerWeek}</p>
        <p>Start Date: ${new Date(plan.weekStart).toDateString()}</p>
      </div>
      <div class="training-days">
        ${plan.trainingDays
          .map(
            (day) => `
            <div class="training-day">
              <h3>${day.day} - ${day.trainingType}</h3>
              ${day.exercises
                .map(
                  (exercise) => `
                  <div class="training-card">
                    <div class="exercise-thumbnail">
                      <img src="${exercise.thumbnail}" alt="${exercise.name}">
                    </div>
                    <div class="exercise-details">
                      <h3>${exercise.name}</h3>
                      <p>Instructions: ${exercise.instructions}</p>
                      <p>Sets: ${exercise.sets}</p>
                      <p>Reps: ${exercise.reps}</p>
                      <p>Weight: ${exercise.weight} kg</p>
                      <p>Rest: ${exercise.rest} sec</p>
                    </div>
                  </div>
              `
                )
                .join("")}
            </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

fetchTrainingPlan();