document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addExerciseForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = form.querySelector('[name="name"]').value;
      const thumbnail = form.querySelector('[name="thumbnail"]').value;
      const video = form.querySelector('[name="video"]').value;
      const instruction = form.querySelector('[name="instruction"]').value;
      const movement = form.querySelector('[name="movement"]').value;
      const trainingType = form.querySelector('[name="trainingType"]').value;
      const category = form.querySelector('[name="category"]').value;
      const tagsInput = form.querySelector('[name="tags"]').value;
  
      const tagsArray = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
  
      const equipmentSelects = form.querySelectorAll('select[name="equipment"]');
      const equipmentArray = Array.from(equipmentSelects)
        .map(select => select.value)
        .filter(value => value !== '');
  
      const musclesSelects = form.querySelectorAll('select[name="muscles"]');
      const musclesArray = Array.from(musclesSelects)
        .map(select => select.value)
        .filter(value => value !== '');
  
      if (musclesArray.length === 0) {
        alert("Please select at least one muscle.");
        return;
      }

      const payload = {
        name,
        thumbnail,
        video,
        instruction,
        muscles: JSON.stringify(musclesArray),
        equipment: JSON.stringify(equipmentArray),
        movement,
        trainingType,
        category,
        tags: JSON.stringify(tagsArray)
      };
  
      try {
        const response = await fetch('/api/v1/exercises/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Exercise added successfully!");
          form.reset();
        } else {
          alert("Error: " + result.message);
        }
      } catch (err) {
        console.error("Error submitting exercise:", err);
        alert("An error occurred while submitting the exercise.");
      }
    });
  
    window.addEquipmentSelect = function () {
      const container = document.getElementById('equipment-selects');
      const firstSelect = container.querySelector('select[name="equipment"]');
      if (!firstSelect) return;
      const newSelect = firstSelect.cloneNode(true);

      newSelect.selectedIndex = 0;
      container.appendChild(newSelect);
    };

    window.addMuscleSelect = function () {
      const container = document.getElementById('muscle-selects');
      const firstSelect = container.querySelector('select[name="muscles"]');
      if (!firstSelect) return;
      const newSelect = firstSelect.cloneNode(true);
      newSelect.selectedIndex = 0;
      container.appendChild(newSelect);
    };
  });
  