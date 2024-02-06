// Function to display streaming schedule for the whole year
function displayYearlySchedule(date) {
    // Clear existing schedule
    streamingSchedule.innerHTML = '';

    // Create header row with days of the week
    const headerRow = document.createElement("tr");
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysOfWeek.forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    streamingSchedule.appendChild(headerRow);

    // Populate streaming schedule for the given year
    const startYear = date.getFullYear();
    const endYear = startYear + 1;
    for (let year = startYear; year < endYear; year++) {
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);
            let currentRow;
            for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
                if (day.getDay() === 0) {
                    // Start a new row for each week
                    currentRow = document.createElement("tr");
                    streamingSchedule.appendChild(currentRow);
                }
                const td = document.createElement("td");
                td.textContent = day.getDate();
                td.classList.add('clickable'); // Add class to make the cell clickable
                td.addEventListener('click', function() {
                    displayPopup(day);
                });
                currentRow.appendChild(td);
            }
        }
    }
}

// Function to display popup with notes for the selected day
function displayPopup(day) {
    popupDate.textContent = formatDate(day);
    // Fetch and display notes for the selected day
    const notes = getNotesForDay(day); // Implement this function to fetch notes
    popupNotes.textContent = notes;
    // Show the popup
    popup.style.display = "block";
}

// Function to format date as "Month Day, Year"
function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Function to get notes for the selected day
function getNotesForDay(day) {
    // Implement this function to fetch notes from your data source
    return "Notes for " + formatDate(day); // Example notes
}

// Close the popup when the close button is clicked
popup.querySelector(".close").addEventListener("click", function() {
    popup.style.display = "none";
});

// Event listener for previous year button
document.getElementById("prev-year").addEventListener("click", function() {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    displayYearlySchedule(currentDate);
});

// Event listener for next year button
document.getElementById("next-year").addEventListener("click", function() {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    displayYearlySchedule(currentDate);
});

// Initial display of the streaming schedule
displayYearlySchedule(currentDate);