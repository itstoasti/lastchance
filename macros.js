```javascript
// Importing the database module
const db = require('./database.py');

// Variables to store the macros data
let macrosData = [];

// Function to get the macros data from the database
function getData() {
    db.getMacrosData()
        .then(data => {
            macrosData = data;
            displayMacrosData();
        })
        .catch(error => {
            displayMessage('errorMessage', 'Error: ' + error.message);
        });
}

// Function to display the macros data
function displayMacrosData() {
    const macrosContainer = document.getElementById('macros-container');
    macrosContainer.innerHTML = '';
    macrosData.forEach(macro => {
        const macroElement = document.createElement('div');
        macroElement.textContent = `Name: ${macro.name}, Amount: ${macro.amount}`;
        macrosContainer.appendChild(macroElement);
    });
}

// Function to add new macros data
function addData(name, amount) {
    db.addMacrosData(name, amount)
        .then(() => {
            displayMessage('successMessage', 'Macro added successfully');
            getData();
        })
        .catch(error => {
            displayMessage('errorMessage', 'Error: ' + error.message);
        });
}

// Function to update macros data
function updateData(id, name, amount) {
    db.updateMacrosData(id, name, amount)
        .then(() => {
            displayMessage('successMessage', 'Macro updated successfully');
            getData();
        })
        .catch(error => {
            displayMessage('errorMessage', 'Error: ' + error.message);
        });
}

// Function to delete macros data
function deleteData(id) {
    db.deleteMacrosData(id)
        .then(() => {
            displayMessage('successMessage', 'Macro deleted successfully');
            getData();
        })
        .catch(error => {
            displayMessage('errorMessage', 'Error: ' + error.message);
        });
}

// Function to display a message to the user
function displayMessage(id, message) {
    const messageElement = document.getElementById(id);
    messageElement.textContent = message;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000);
}

// Initial data fetch
getData();
```