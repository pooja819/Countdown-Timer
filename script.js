document.getElementById('add-timer-button').addEventListener('click', function() {
    const container = document.getElementById('countdown-container');
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');

    timerElement.innerHTML = `
        <input type="datetime-local" class="datetime-input" />
        <button class="start-button">Start</button>
        <div class="timer-display">
            <span class="days">00</span> Days
            <span class="hours">00</span> Hours
            <span class="minutes">00</span> Minutes
            <span class="seconds">00</span> Seconds
        </div>
        <div class="message"></div>
    `;

    container.appendChild(timerElement);

    timerElement.querySelector('.start-button').addEventListener('click', function() {
        const input = timerElement.querySelector('.datetime-input').value;
        if (!input) return;

        const targetDate = new Date(input).getTime();
        const interval = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                timerElement.querySelector('.message').textContent = 'Countdown finished!';
                timerElement.querySelector('.days').textContent = '00';
                timerElement.querySelector('.hours').textContent = '00';
                timerElement.querySelector('.minutes').textContent = '00';
                timerElement.querySelector('.seconds').textContent = '00';
                document.getElementById('notification-sound').play(); // Play sound when the timer finishes
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.querySelector('.days').textContent = String(days).padStart(2, '0');
            timerElement.querySelector('.hours').textContent = String(hours).padStart(2, '0');
            timerElement.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
            timerElement.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
        }, 1000);
    });
});

document.getElementById('theme-selector').addEventListener('change', function(event) {
    const theme = event.target.value;
    document.body.className = theme;
});