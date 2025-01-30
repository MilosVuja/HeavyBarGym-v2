let selectedMuscles = [];

function addMuscleSelect() {
    const muscleSelectContainer = document.getElementById('muscle-selects');
    const newSelect = document.createElement('select');
    newSelect.name = 'muscles';
    newSelect.required = true;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select a muscle';
    newSelect.appendChild(defaultOption);

    const firstSelect = document.querySelector('select[name="muscles"]');
    if (firstSelect) {
        const options = Array.from(firstSelect.options);
        options.forEach(option => {
            if (!selectedMuscles.includes(option.value) && option.value) {
                const newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.textContent = option.textContent;
                newSelect.appendChild(newOption);
            }
        });
    }

    newSelect.addEventListener('change', function () {
        const selectedValue = newSelect.value;
        if (selectedValue && !selectedMuscles.includes(selectedValue)) {
            selectedMuscles.push(selectedValue);
        }
    });

    muscleSelectContainer.appendChild(newSelect);
}

function resetMuscleSelects() {
    const muscleSelectContainer = document.getElementById('muscle-selects');
    muscleSelectContainer.innerHTML = '';

    addMuscleSelect();

    selectedMuscles = [];
}

document.getElementById('addExerciseForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const video = document.getElementById('video').value;
    const instruction = document.getElementById('instruction').value;

    const muscleSelects = document.querySelectorAll('select[name="muscles"]');
    const selectedMuscles = Array.from(muscleSelects)
        .map(select => select.value)
        .filter(value => value);

    if (selectedMuscles.length === 0) {
        alert("Please select at least one muscle.");
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);
    formData.append('instruction', instruction);
    formData.append('muscle', JSON.stringify(selectedMuscles));

    fetch(this.action, {
        method: this.method,
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Exercise added successfully!");

                document.getElementById('name').value = '';
                document.getElementById('thumbnail').value = '';
                document.getElementById('video').value = '';
                document.getElementById('instruction').value = '';

                resetMuscleSelects();
                location.reload();
            } else {
                alert(data.message || "An error occurred while adding the exercise.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        });
});
