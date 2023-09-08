const time = document.getElementById("time-display");
const zone = document.getElementById("time-zone");

function startTime() {
    const today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let timeZone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
    const ampm = hour >= 12 ? 'PM' : 'AM';   // To set AM or PM
    // To have 12 hour time format
    hour= hour > 12 ? hour-12 : hour;
    //  To append 0 before minutes and seconds when they are less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    //  Setting time on screen.
    time.innerHTML =  hour + " : " + minutes + " : " + seconds + " " + ampm;
    zone.innerHTML = "Time- Zone : " + timeZone;
    setInterval(startTime, 1000);
  }
 
  startTime()