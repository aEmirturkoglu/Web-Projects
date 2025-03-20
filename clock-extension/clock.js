// Create the hour markings
const markings = document.getElementById('markings');
for (let i = 0; i < 60; i++) {
    const mark = document.createElement('div');
    if (i % 5 === 0) {
        mark.className = 'hour-mark';
    }
    mark.style.transform = `rotate(${i * 6}deg)`;
    markings.appendChild(mark);
}

// Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Calculate angles
    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;
    
    // Apply rotations
    document.getElementById('hour').style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    document.getElementById('minute').style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    document.getElementById('second').style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
    
    // Update digital display
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('digital').textContent = timeString;
}

// Update immediately and then every second
updateClock();
setInterval(updateClock, 1000);