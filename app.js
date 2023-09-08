const time = document.getElementById("time-display");
const zone = document.getElementById("time-zone");
const addButton = document.getElementById("alarmButton");
const setButton = document.getElementById("set");
const closeButton = document.getElementById("cancel");
const form = document.getElementById("alarmForm");
const show = document.getElementById("alarmList");
let alarms = [];
let hrValue;
let minValue;
let secValue;
let amPm;
let aName;


function startTime() {
    const today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let timeZone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
    const ampm = hour >= 12 ? 'PM' : 'AM';   // To set AM or PM
    // To have 12 hour time format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour 0 should be 12

    //  To append 0 before  hours,minutes and seconds when they are less than 10
    hour = append(hour);
    minutes = append(minutes);
    seconds = append(seconds); 
    //  Setting time on screen.
    time.innerHTML =  hour + " : " + minutes + " : " + seconds + " " + ampm;
    zone.innerHTML = "Time- Zone : " + timeZone;
    setInterval(startTime, 1000);
  }
 
  startTime();

  // Function to append 0 before hour, minutes and seconds which are less than 10

   function append  (data){
    data = data < 10 ? "0" + data : data;
    return data;
  }

  //  Adding Event handlers to the button

  //  Binding event to add alarm button
  addButton.addEventListener('click',function(){
    // Toggle the visibility of the form
    if(form.style.display === 'none' || form.style.display === ''){
      clearFormFields(form);          // to get a fresh form
      form.style.display = 'block';
    }else{
      
      form.style.display = 'none';
    }
  });

  //  function to clear all the previous alarm inputs and render a fresh form
  function clearFormFields(form) {
    const formInputs = form.querySelectorAll('input');
    formInputs.forEach(input => {
        if (input.type !== 'submit') {
            input.value = '';
        }
    });
  }
  //  Binding event to set button
  setButton.addEventListener("click",function(){
    // getting alarm value
    aName = document.getElementById("name").value;
    //console.log(aName);
    hrValue = document.getElementById("hour").value;
    //console.log(hrValue);
    minValue = document.getElementById("minutes").value;
    //console.log(minValue);
    secValue = document.getElementById("seconds").value;
    //console.log(secValue);
    if(document.getElementById("am").checked === true){
      amPm = 'am';
    }else{
      amPm = 'pm';
    }    
    //console.log(amPm);
    // check if vales are in the range
    if(hrValue >12 || hrValue < 1 || minValue > 60 || minValue < 0 || secValue > 60 || secValue < 0){
      alert("Enter the valid time inputs");
    }
    // check if the alarm vale is empty or not
    if(hrValue !== '' && minValue !== '' && secValue !== ''){
      // to append 0 before hour,minutes and seconds
      hrValue = append(hrValue);
      minValue = append(minValue);
      secValue = append(secValue);

      // pushing alarms into array as objects
        alarms.push({
          id:alarms.length,
          name : aName,
          hour : hrValue,
          minute : minValue,
          second : secValue,
          ampm : amPm
        });
    }

    // console.log(alarms);
    // To hide the alarm form
    form.style.display = 'none';
    showAlarms();  // call to show the created alaram on screen
  });

  // Binding event to close button
  closeButton.addEventListener("click",function(){
    form.style.display = 'none';
  });

  //  Displaying the set alarms
   function showAlarms(){
    if(alarms.length !== 0){
      let wrapper = document.createElement('div');
      let showAlarmList = document.createElement('div');
      
         // Create a trash icon button for each entry using Font Awesome
         const deleteButton = document.createElement('button');
         deleteButton.innerHTML = '  <i class="fa-solid fa-trash"></i> ';
         deleteButton.classList.add('button');
         deleteButton.setAttribute( 'onclick="del(${alarms.length}")');
 
         deleteButton.addEventListener('click', function() {
             // Remove the corresponding entry when the delete button is clicked
             alarms.splice(index, 1);
             showAlarms(); // Re-display the data after deletion
         });

      for(let i=0;i<alarms.length;i++){
        showAlarmList.innerHTML = alarms[i].name + " &nbsp&nbsp&nbsp" + alarms[i].hour + " : "+ alarms[i].minute + " : " + alarms[i].second + "  " +  alarms[i].ampm;

        
        wrapper.appendChild(showAlarmList);
        wrapper.appendChild(deleteButton);

        show.appendChild(wrapper);
      }
    }    
   }

   



