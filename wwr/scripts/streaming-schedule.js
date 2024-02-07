document.addEventListener("DOMContentLoaded", function() {
    const streamingSchedule = document.getElementById('schedule-table');
    const popup = document.getElementById('popup');
    const popupDate = document.getElementById('popup-date');
    const popupNotes = document.getElementById('popup-notes');

    streamingSchedule.querySelectorAll('.clickable').forEach(function(entry) {
        entry.addEventListener('click', function() {
            const notes = this.getAttribute('data-notes');
            const scheduledGame = this.getAttribute('data-game');
            popupDate.textContent = 'Notes for ' + getScheduledGameHTML(scheduledGame);
            popupNotes.textContent = notes;
            popup.style.display = 'block';
        });
    });

    popup.addEventListener('click', function () {
        const activeEntry = streamingSchedule.querySelector('tr.active');
        if (activeEntry) {
            const gameOption = activeEntry.querySelector('.clickable').getAttribute('data-game');
            const notes = generateRandomPrompt(gameOption); // Ensure generateRandomPrompt is accessible
            popupNotes.textContent = notes;
        }
    });

    popup.querySelector('.close').addEventListener('click', function() {
        popup.style.display = 'none';
    });

    addScheduleRow('1', '12:00', 'Streaming Rocket League gameplay', 'Rocket League');
    addScheduleRow('2', '15:00', 'Streaming Tarkov raids', 'Tarkov');
    addScheduleRow('3', '18:00', 'Roblox adventure with viewers', 'Roblox');
});

function addScheduleRow(day, time, activity, gameOption) {
    const streamingSchedule = document.getElementById('schedule-table');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td class="clickable">${day}</td>
      <td class="clickable">${time}</td>
      <td class="clickable" data-game="${gameOption}" data-notes="${generateRandomPrompt(gameOption)}">${activity}</td>
    `;
    streamingSchedule.querySelector('tbody').appendChild(newRow);
}

function generateRandomPrompt(gameOption) {
    switch (gameOption) {
        case 'Rocket League':
            const rocketLeaguePrompts = [
                'Focus on improving your aerial shots.',
                'Work on your dribbling skills.',
                'Try out some new car designs.',
                'Practice fast aerials for better positioning.',
                'Experiment with different camera settings.'
            ];
            return rocketLeaguePrompts[Math.floor(Math.random() * rocketLeaguePrompts.length)];
        case 'Tarkov':
            const tarkovPrompts = [
                'Plan your loadout carefully for the next raid.',
                'Study the maps to find the best routes.',
                'Practice your aim in offline mode.',
                'Try out different tactics for approaching engagements.',
                'Watch some tutorials to improve your gameplay.'
            ];
            return tarkovPrompts[Math.floor(Math.random() * tarkovPrompts.length)];
        case 'Roblox':
            const robloxPrompts = [
                'Design a new game level for your viewers.',
                'Customize your avatar to stand out.',
                'Explore new games with your viewers.',
                'Create challenges for your audience to participate in.',
                'Work on scripting to enhance your games.'
            ];
            return robloxPrompts[Math.floor(Math.random() * robloxPrompts.length)];
        default:
            return 'Prepare for an exciting gaming session!';
    }
}

function getScheduledGameHTML(gameName) {
    return `<span style="color: red;">${gameName}</span>`;
}
