<script>
// Add your JavaScript code here
document.addEventListener("DOMContentLoaded", function() {
    const streamingSchedule = document.getElementById("schedule-table");
    const popup = document.getElementById("popup");
    const popupDate = document.getElementById("popup-date");
    const popupNotes = document.getElementById("popup-notes");

    // Define the list of games
    const games = ['Rocket League', 'Tarkov', 'Roblox']; // Add more games as needed

    // Function to generate a random prompt based on the game option
    function generateRandomPrompt(gameOption) {
        switch (gameOption) {
            case 'Rocket League':
                return 'Practice aerial shots and dribbling skills.';
            case 'Tarkov':
                return 'Plan your loadout and map strategies for the next raid.';
            case 'Roblox':
                return 'Design a new game level or avatar customization.';
            default:
                return 'Prepare for an exciting gaming session!';
        }
    }

    // Function to add a new row to the schedule table
    function addScheduleRow(day, time, activity, gameOption) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td class="clickable">${day}</td>
          <td class="clickable">${time}</td>
          <td class="clickable" data-notes="${generateRandomPrompt(gameOption)}">${activity}</td>
        `;
        streamingSchedule.querySelector('tbody').appendChild(newRow);
    }

    // Add sample schedule entries
    addScheduleRow('1', '12:00', 'Streaming Rocket League gameplay', 'Rocket League');
    addScheduleRow('2', '15:00', 'Streaming Tarkov raids', 'Tarkov');
    addScheduleRow('3', '18:00', 'Roblox adventure with viewers', 'Roblox');

    // Functionality for showing popup with notes when clicking on a schedule entry
    streamingSchedule.querySelectorAll('.clickable').forEach(function(entry) {
        entry.addEventListener('click', function() {
            const notes = this.getAttribute('data-notes');
            popupDate.textContent = 'Notes for ' + this.parentElement.querySelector('td:nth-child(1)').textContent;
            popupNotes.textContent = notes;
            popup.style.display = 'block';
        });
    });

    // Functionality for closing the popup
    popup.querySelector('.close').addEventListener('click', function() {
        popup.style.display = 'none';
    });
});
</script>
