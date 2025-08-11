document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('input-container');
    const addSongButton = document.getElementById('add-song');
    const calculateButton = document.getElementById('calculate-button');
    const resetButton = document.getElementById('reset-button');
    const totalTimeSpan = document.getElementById('totalTime');
    const timeBetweenSongsInput = document.getElementById('time-between-songs');

    function parseTimeStringToSeconds(timeString) {
        const parts = timeString.match(/\d+/g) || [];
        let minutes = 0;
        let seconds = 0;
        
        if (parts.length === 2) {
            minutes = parseInt(parts[0]);
            seconds = parseInt(parts[1]);
        } else if (parts.length === 1) {
            minutes = parseInt(parts[0]);
        }

        return (isNaN(minutes) ? 0 : minutes * 60) + (isNaN(seconds) ? 0 : seconds);
    }

    function createSongInput() {
        const songNumber = document.querySelectorAll('.song-input').length + 1;
        const songDiv = document.createElement('div');
        songDiv.className = 'song-input';
        songDiv.innerHTML = `<label>Song ${songNumber} Duration:</label> <input type="text" class="song-time" placeholder="e.g., 3:45">`;
        inputContainer.appendChild(songDiv);
        
        const newSongInput = songDiv.querySelector('.song-time');
        newSongInput.addEventListener('keydown', handleEnterKey);
        newSongInput.focus();
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            
            const timeString = event.target.value.trim();
            const parts = timeString.match(/\d+/g) || [];
            
            if (parts.length === 2 && parseInt(parts[1]) > 59) {
                alert("Seconds cannot be more than 59. Please correct your input.");
                event.target.value = '';
                return;
            }
            
            createSongInput();
            calculateTotal();
        }
    }


    function calculateTotal() {
        let totalSeconds = 0;
        const timeInputs = document.querySelectorAll('.song-time');

        timeInputs.forEach(input => {
            totalSeconds += parseTimeStringToSeconds(input.value);
        });

        const numberOfSongs = timeInputs.length;
        if (numberOfSongs > 1) {
            const timeBetweenSongs = parseTimeStringToSeconds(timeBetweenSongsInput.value);
            const totalIntervalSeconds = timeBetweenSongs * (numberOfSongs - 1);
            totalSeconds += totalIntervalSeconds;
        }

      
        const finalHours = Math.floor(totalSeconds / 3600);
        const finalMinutes = Math.floor((totalSeconds % 3600) / 60);
        const finalSeconds = totalSeconds % 60;
        
        let timeString = '';
        if (finalHours > 0) {
            timeString += `${finalHours} hour${finalHours > 1 ? 's' : ''}, `;
        }
        timeString += `${finalMinutes} minute${finalMinutes !== 1 ? 's' : ''}, `;
        timeString += `${finalSeconds} second${finalSeconds !== 1 ? 's' : ''}`;

        totalTimeSpan.textContent = timeString;
    }
    
   
    function resetCalculator() {
    
        const songInputs = document.querySelectorAll('.song-input');
        if (songInputs.length > 1) {
            for (let i = 1; i < songInputs.length; i++) {
                songInputs[i].remove();
            }
        }
        
     
        const firstSongInput = document.querySelector('.song-time');
        if (firstSongInput) {
            firstSongInput.value = '';
            firstSongInput.focus();
        }
        
     
        timeBetweenSongsInput.value = '';
        totalTimeSpan.textContent = '0 minutes, 0 seconds';
    }


    createSongInput();

    addSongButton.addEventListener('click', createSongInput);
    calculateButton.addEventListener('click', calculateTotal);
    resetButton.addEventListener('click', resetCalculator);
    timeBetweenSongsInput.addEventListener('input', calculateTotal);
});