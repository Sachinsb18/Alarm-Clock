//  Tapping into each of the required elemnts via DOM manipulation functions
const time = document.getElementById("time-display");
const zone = document.getElementById("time-zone");
const addButton = document.getElementById("add-alarm");
const setHours = document.getElementById("getUserHours");
const setMinutes = document.getElementById("getUserMinutes");
const setSeconds = document.getElementById("getUserSeconds");
const setAmPm = document.getElementById("am-pm");
const form = document.getElementById("input-alarm");
const show = document.getElementById("alarmList");
const currentDay = document.getElementById("days");
const currentDate = document.getElementById("date");

// Declaring the variables needed in global space
let alarms = [];
let hrValue;
let minValue;
let secValue;
let amPm;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


// Adding dropdown values for alarm input fields
window.addEventListener("DOMContentLoaded", () => {
   
  dropDownMenu(0, 12, setHours);
 
  dropDownMenu(0, 59, setMinutes);

  dropDownMenu(0, 59, setSeconds);

});

// Function to add dropdown values for each input field
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

//  function to display the current time on the screen

function startTime() {
    const today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds(); 
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();   
    let timeZone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
    const ampm = hour >= 12 ? 'PM' : 'AM';   // To set AM or PM
    
    // To have 12 hour time format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour 0 should be 12

    //  To append 0 before  hours,minutes and seconds when they are less than 10
    hour = append(hour);
    minutes = append(minutes);
    seconds = append(seconds); 

    //  Setting time and date on screen.
    currentDay.innerHTML = weekday[today.getDay()];
    currentDate.innerHTML = dd + ' / ' + mm + ' / ' + yyyy;
    time.innerHTML =  hour + " : " + minutes + " : " + seconds + " " + ampm;
    zone.innerHTML = "Time- Zone : " + timeZone;

    checkAlarms(hour, minutes, seconds, ampm); // To check the alarms every second

    setInterval(startTime, 1000);  // To update the current time with the local time every second

  }
 
  startTime();  // calling the starttime function 1st time on load

  // Function to append 0 before hour, minutes and seconds which are less than 10

   function append (data){
    data = data < 10 ? "0" + data : data;    
    return data;
  }



 //  Binding event to set button
  addButton.addEventListener("click",function(){
  // getting alarm value
  hrValue = setHours.value;
  minValue = setMinutes.value;  
  secValue = setSeconds.value;  
  amPm =setAmPm.value;

  // check if vales are in the range
  if(hrValue >12 || hrValue < 1 || minValue > 60 || minValue < 0 || secValue > 60 || secValue < 0){
    alert("Enter the valid time inputs");
    return;
  }
  // check if the alarm vale is empty or not
  if(hrValue !== '' && minValue !== '' && secValue !== ''){    

    // pushing alarms into array as objects
      alarms.push({
        id:alarms.length+1,
        hour : hrValue,
        minute : minValue,
        second : secValue,
        ampm : amPm,
        alerted : false
      });
  }
  
    showAlarms();  // calling showAlarms function to display the set alarms on the screen

    
    clearFormFields();
  });

  //  function to clear all the previous alarm inputs and render a fresh inputs 

  function clearFormFields() {

    //  To rest dropdown values to show zero
    setHours.innerHTML = "00";
    setMinutes.innerHTML = "00";
    setSeconds.innerHTML = "00";

    // To set the dropdown value to each input fields
    dropDownMenu(0, 12, setHours);
 
    dropDownMenu(0, 59, setMinutes);

    dropDownMenu(0, 59, setSeconds);
  }

//  function for displaying the set alarms list

  function showAlarms(){

    show.innerHTML = "";   // To Clear the list before re-rendering
   
    // Looping through the alarms and showing them on the screen

    alarms.forEach((alarm) => {
      let showAlarmList = document.createElement('div');
      showAlarmList.innerHTML =  `${alarm.hour} : ${alarm.minute} : ${alarm.second}   ${alarm.ampm} `;
      
        // Creating a delete button with a trash icon
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button");
        deleteButton.innerHTML = '<i class="fas fa-trash fa-2x"></i>';
        deleteButton.addEventListener("click", () => {
            deleteAlarm(alarm.id);
        });

        showAlarmList.appendChild(deleteButton);    // binding the button at the end of each alarm list    
        show.appendChild(showAlarmList);        //binding the current alarm to the previously added alarm 
    });    
  }    


 // Function to delete an alarm by ID

 function deleteAlarm(id) {
  alarms = alarms.filter((alarm) => alarm.id !== id); // creating a new array that excludes the alarm with the specified ID by this method
  showAlarms(); // Re-render the updated list
  }


  // Function to track the alarm  and notify the user if the time same as current time

  function checkAlarms(currentHour, currentMinute, currentSecond, ampm) {     
  
    // To get the curren time in typeof numbers, we need to parse them into a number
    currentHour = parseInt(currentHour);
    currentMinute = parseInt(currentMinute);
    currentSecond = parseInt(currentMinute);     
    
    //  looping through the array object to check the alarm
    alarms.forEach((alarm) => {    

      // Condition to check if set time is equal to current time
      if(parseInt(alarm.hour) === currentHour && parseInt(alarm.minute) === currentMinute && parseInt (alarm.second) <= currentSecond && alarm.ampm === ampm && !alarm.alerted) {
          window.alert("time is up");
          alarm.alerted = true; // to prevent alert to pop continuously
      }
    });

  }
  
