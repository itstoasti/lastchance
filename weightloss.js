```javascript
let weightlossData = [];

// Function to get data from the database
async function getData() {
    const response = await fetch('/database.py');
    weightlossData = await response.json();
    displayData();
}

// Function to display data on the website
function displayData() {
    const weightlossContainer = document.getElementById('weightloss-container');
    weightlossContainer.innerHTML = '';
    weightlossData.forEach((data, index) => {
        weightlossContainer.innerHTML += `
            <div class="weightloss-item">
                <h3>${data.date}</h3>
                <p>Weight: ${data.weight}</p>
                <p>Goal: ${data.goal}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        `;
    });
}

// Function to add data to the database
async function addData() {
    const date = document.getElementById('date').value;
    const weight = document.getElementById('weight').value;
    const goal = document.getElementById('goal').value;
    const response = await fetch('/database.py', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, weight, goal })
    });
    const result = await response.json();
    if (result.success) {
        getData();
        document.getElementById('successMessage').textContent = 'Data added successfully';
    } else {
        document.getElementById('errorMessage').textContent = 'Failed to add data';
    }
}

// Function to delete data from the database
async function deleteData(index) {
    const response = await fetch(`/database.py/${weightlossData[index].id}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
        getData();
        document.getElementById('deleteMessage').textContent = 'Data deleted successfully';
    } else {
        document.getElementById('errorMessage').textContent = 'Failed to delete data';
    }
}

// Call getData when the page loads
window.onload = getData;
```