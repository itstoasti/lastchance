```javascript
let recipesData = [];

// Function to get data from the database
async function getData() {
    const response = await fetch('/database.py');
    recipesData = await response.json();
}

// Function to add data to the database
async function addData(recipe) {
    const response = await fetch('/database.py', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (response.ok) {
        console.log('Success:', response);
        successMessage("Recipe added successfully");
    } else {
        console.log('Error:', response);
        errorMessage("Failed to add recipe");
    }
}

// Function to update data in the database
async function updateData(recipe) {
    const response = await fetch(`/database.py/${recipe.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (response.ok) {
        console.log('Success:', response);
        updateMessage("Recipe updated successfully");
    } else {
        console.log('Error:', response);
        errorMessage("Failed to update recipe");
    }
}

// Function to delete data from the database
async function deleteData(id) {
    const response = await fetch(`/database.py/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Success:', response);
        deleteMessage("Recipe deleted successfully");
    } else {
        console.log('Error:', response);
        errorMessage("Failed to delete recipe");
    }
}

// Function to display success message
function successMessage(message) {
    const successDiv = document.getElementById('success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
}

// Function to display error message
function errorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Function to display update message
function updateMessage(message) {
    const updateDiv = document.getElementById('update-message');
    updateDiv.textContent = message;
    updateDiv.style.display = 'block';
}

// Function to display delete message
function deleteMessage(message) {
    const deleteDiv = document.getElementById('delete-message');
    deleteDiv.textContent = message;
    deleteDiv.style.display = 'block';
}

getData();
```