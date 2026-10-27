const form = document.getElementById('char-form');
form.noValidate = true;

const nameInput = document.getElementById('char-name');
const nameError = document.getElementById('name-error');
const strInput = document.getElementById('strength');
const agiInput = document.getElementById('agility');
const pointsLeftSpan = document.getElementById('points-left');

const takenNames = ["Admin", "Hero", "DragonSlayer"];

function validateFormLive() {
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name cannot be empty.";
        nameInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else if (takenNames.includes(nameInput.value.trim())) {
        nameError.textContent = "This name is already taken. Please choose another.";
        nameInput.setAttribute('aria-invalid', 'true');
        isValid = false;
    } else {
        nameError.textContent = "";
        nameInput.setAttribute('aria-invalid', 'false');
    }

    // Calculate points
    const str = Number(strInput.value);
    const agi = Number(agiInput.value);
    const totalPoints = str + agi;
    const remaining = 20 - totalPoints;
    
    pointsLeftSpan.textContent = remaining;
    if (remaining < 0 || remaining > 18) {
        pointsLeftSpan.style.color = 'red';
        isValid = false;
    } else {
        pointsLeftSpan.style.color = 'black';
    }

    return isValid;
}

nameInput.addEventListener('input', validateFormLive);
strInput.addEventListener('input', validateFormLive);
agiInput.addEventListener('input', validateFormLive);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateFormLive()) {
        alert("Character successfully created!");
        form.reset();
        validateFormLive();
    } else {
        alert("Please fix the errors!");
    }
});