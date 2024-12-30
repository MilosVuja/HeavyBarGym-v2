document.addEventListener("DOMContentLoaded", () => {
  const musclePaths = document.querySelectorAll("#muscle-svg .muscle");

  musclePaths.forEach((muscle) => {
    muscle.addEventListener("click", () => {
      const muscleName = muscle.getAttribute("data-muscle");
      const muscleDescription = muscle.getAttribute("data-description");
      const muscleExercises = muscle.getAttribute("data-exercises");

      document.getElementById("muscle-name").innerText = muscleName;
      document.getElementById("muscle-desc").innerText = muscleDescription;
      document.getElementById("muscle-exercises").innerText = muscleExercises;
    });
  });
});
