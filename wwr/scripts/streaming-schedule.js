document.addEventListener("DOMContentLoaded", function() {
    const streamingSchedule = document.getElementById('schedule-table');
    const popup = document.getElementById('popup'); // Corrected document.('popup') to document.getElementById('popup')
    const popupDate = document.getElementById('popup-date');
    const popupNotes = document.getElementById('popup-notes');

    // Initialize schedule if not already present in local storage
    if (!localStorage.getItem('schedule')) {
        initializeSchedule();
    }
    const schedule = JSON.parse(localStorage.getItem('schedule'));

    // Render schedule
    function renderSchedule(schedule) {
        const streamingSchedule = document.getElementById('schedule-table').querySelector('tbody');
        schedule.forEach(entry => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="clickable">${new Date(entry.date).getDate()}</td>
                <td class="clickable">${entry.time}</td>
                <td class="clickable" data-notes="${new Date(entry.date).getDate()}-${entry.gameOption}">1/6 Games</td>
            `;
            streamingSchedule.appendChild(newRow);
        });
    }

    // Click event listener for showing notes
    streamingSchedule.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('clickable')) {
            const notes = target.getAttribute('data-notes');
            const [day, gameOption] = notes.split('-');
            popupDate.textContent = `Notes for Day ${day}`;
            // Update popupNotes text content
            popupNotes.textContent = `Game: ${gameOption}`;

            // Display the popup
            popup.style.display = 'block';
        }
    });

    // Close popup event listener
    popup.querySelector('.close').addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Initialize the schedule for the following year
    function initializeSchedule() {
        const schedule = [];
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() + 1);

        // Define game options
        const gameOptions = ['Phasmophobia', 'Lethal Company', 'Rocket League', 'Tarkov', 'League of Legends', 'Modded Minecraft'];

        // Generate schedule for each day of the year
        for (let i = 0; i < 365; i++) {
            const currentDate = new Date(startDate.getTime());
            currentDate.setDate(currentDate.getDate() + i);
            const gameOption = gameOptions[Math.floor(Math.random() * gameOptions.length)];
            schedule.push({
                date: currentDate.toISOString().split('T')[0],
                time: '12:00',
                activity: gameOption,
                gameOption: gameOption
            });
        }
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }

    // Function to generate a random game option
    function generateRandomGameOption() {
        const options = ['Phasmophobia', 'Lethal Company', 'Rocket League', 'Tarkov', 'League of Legends', 'Modded Minecraft'];
        return options[Math.floor(Math.random() * options.length)];
    }

    // Render schedule
    renderSchedule(schedule);
});
