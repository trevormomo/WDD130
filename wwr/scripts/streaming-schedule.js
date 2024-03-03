
document.addEventListener("DOMContentLoaded", function() {
        const streamingSchedule = document.getElementById('schedule-table');
        const popup = document.getElementById('popup');
    <div id="popup" class="popup">
        <div class="popup-content">
            <span class="close">&times;</span>
            <h2 id="popup-date" class="neon-green"></h2>
            <p id="popup-notes" class="neon-green"></p>
        </div>
    </div>

        // Initialize schedule if not already present in local storage
        if (!localStorage.getItem('schedule')) {
            initializeSchedule();
        }
        const schedule = JSON.parse(localStorage.getItem('schedule'));
        
        // Render schedule
        renderSchedule(schedule);
        
        // Click event listener for showing notes
        streamingSchedule.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('clickable')) {
                const notes = target.getAttribute('data-notes');
                const day = target.parentElement.querySelector('td:nth-child(2)').textContent;
                popupDate.textContent = `Game for ${day}`;
                popupNotes.textContent = notes;
                popup.style.display = 'block';
            }
        });

        // Click event listener for updating notes randomly
        popup.addEventListener('click', function() {
            const activeEntry = streamingSchedule.querySelector('tr.active');
            if (activeEntry) {
                const day = activeEntry.querySelector('td:nth-child(2)').textContent;
                const gameOption = generateRandomGameOption();
                const notes = generateRandomPrompt(gameOption);
                activeEntry.querySelector('td:nth-child(4)').textContent = gameOption;
                activeEntry.querySelector('td:nth-child(4)').setAttribute('data-notes', notes);
                popupNotes.textContent = notes;
            }
        });

        // Close popup event listener
        popup.querySelector('.close').addEventListener('click', function() {
            popup.style.display = 'none';
        });
    });

    // Initialize the schedule for the following year
    function initializeSchedule() {
        const schedule = [];
        const startDate = new Date(); // Get today's date
        startDate.setFullYear(startDate.getFullYear() + 1); // Set to next year
        // Generate schedule for each day of the year
        for (let i = 0; i < 365; i++) {
            const currentDate = new Date(startDate.getTime());
            currentDate.setDate(currentDate.getDate() + i); // Increment date
            const gameOption = generateRandomGameOption(); // Generate random game option
            schedule.push({
                month: currentDate.getMonth() + 1, // Month is zero-based, so add 1
                date: currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: '12:00 PM', // Default time
                game: gameOption // Random game option
            });
        }
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }

    // Render schedule
    function renderSchedule(schedule) {
        const streamingSchedule = document.getElementById('schedule-table').querySelector('tbody');
        schedule.forEach(entry => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="clickable">${entry.month}</td>
                <td class="clickable">${entry.date}</td>
                <td class="clickable">${entry.time}</td>
                <td class="clickable" data-notes="${generateRandomPrompt(entry.game)}">${entry.game}</td>
            `;
            streamingSchedule.appendChild(newRow);
        });
    }

    // Function to generate a random prompt based on the game option
    function generateRandomPrompt(gameOption) {
        switch (gameOption) {
            case 'Rocket League':
                return 'Focus on improving your aerial shots.';
            case 'Tarkov':
                return 'Plan your loadout carefully for the next raid.';
            case 'Roblox':
                return 'Design a new game level for your viewers.';
            case 'Phasmophobia':
                return 'Prepare to be scared in your next ghost hunt!';
            case 'Modded-minecraft':
                return 'Explore the new features in your modded Minecraft world.';
            case 'League of Legends':
                return 'Practice your favorite champion for the upcoming ranked games.';
            default:
                return 'Prepare for an exciting gaming session!';
        }
    }

    // Function to generate a random game option
    function generateRandomGameOption() {
        const options = ['Rocket League', 'Tarkov', 'Roblox', 'Phasmophobia', 'Modded-minecraft', 'League of Legends'];
        return options[Math.floor(Math.random() * options.length)];
    }

