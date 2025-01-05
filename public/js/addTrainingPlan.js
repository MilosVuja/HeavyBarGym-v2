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
      } catch (error) {
        console.error("Error fetching muscle data:", error);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", addMuscleClickListeners);
