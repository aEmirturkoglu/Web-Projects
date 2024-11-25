const birthdayInput = document.getElementById("birthday-input");
const hourInput = document.getElementById("hour-input");
const minuteInput = document.getElementById("minute-input"); 
const calculateButton = document.getElementById("calculate-button");
const result = document.getElementById("result");

function calculate() {
  const birthday = birthdayInput.value;
  const hour = hourInput.value;
  const minute = minuteInput.value; 
  if (birthday && hour && minute) {
    // split the birthday string by "-" and get the year, month, and day values
    const birthdayParts = birthday.split("-");
    const year = parseInt(birthdayParts[0]);
    const month = parseInt(birthdayParts[1]) - 1; // subtract 1 because months are zero-based
    const day = parseInt(birthdayParts[2]);
    // parse the hour and minute values as numbers
    const hourNum = parseInt(hour);
    const minuteNum = parseInt(minute); // added a new variable for the minute number
    // create a date object from the input values
    const birthdayDate = new Date(year, month, day, hourNum, minuteNum); // added the minute part to the date object
    fetch("https://worldtimeapi.org/api/ip")
      .then(response => response.json())
      .then(data => {
        const currentDate = new Date(data.datetime);
        const diff = currentDate - birthdayDate;
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); 
        result.textContent = `You are ${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes old.`; // added the minutes part to the result text
      })
      .catch(error => {
        result.textContent = "Something went wrong.";
        result.style.color = "red";
      });
  } else {
    result.textContent = "Please enter a valid date, hour and minute.";
    result.style.color = "red";
  }
}
calculateButton.addEventListener("click", function() {
  calculate();
});
