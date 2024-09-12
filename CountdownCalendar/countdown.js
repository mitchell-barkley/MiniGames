function getNextEventDate(month, day, time) {
    const currentYear = new Date().getFullYear();
    let eventDate = new Date(`${month} ${day}, ${currentYear} ${time}`);
    const now = new Date();
    
    // If the event has passed this year, set it to next year
    if (now > eventDate) {
        eventDate.setFullYear(currentYear + 1);
    }
    return eventDate.getTime();
}

function startCountdown(timerId, eventTime) {
    setInterval(function() {
        var now = new Date().getTime();
        var distance = eventTime - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById(timerId).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }, 1000);
}

startCountdown("timer1", getNextEventDate("May", 29, "6:30:00"));
startCountdown("timer2", getNextEventDate("April", 1, "6:30:00"));
startCountdown("timer3", getNextEventDate("October", 8, "6:30:00"));
startCountdown("timer4", getNextEventDate("December", 25, "6:30:00"));
startCountdown("timer5", getNextEventDate("January", 1, "6:30:00"));
startCountdown("timer6", getNextEventDate("July", 1, "6:30:00"));
startCountdown("timer7", getNextEventDate("October", 31, "6:30:00"));
startCountdown("timer8", getNextEventDate("October", 14, "6:30:00"));
