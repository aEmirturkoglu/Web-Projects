
let billTotalInput = document.getElementById('billTotalInput')
let tipInput = document.getElementById('tipInput')
let numberOfPeopleDiv = document.getElementById('numberOfPeople')
let perPersonTotalDiv = document.getElementById('perPersonTotal')
let numberOfPeople = Number(numberOfPeopleDiv.innerText) // buna bak ekstradan

const calculateBill = () => { 

  const bill = Number(billTotalInput.value)
  
  const tippercent = Number(tipInput.value) / 100 
  
  const totaltip = bill * tippercent
  
  const total = totaltip + bill

  console.log(total);

  const perPersonTotal = total / numberOfPeople
  

  perPersonTotalDiv.innerText = `$${perPersonTotal.toFixed(2)}` //.toLocaleString('en-US') bak //birini seç sadece yoksa çalışmaz 
}

// split the bill between more people 
const increasePeople = () => {

  numberOfPeople++

  numberOfPeopleDiv.innerText = numberOfPeople 

  // calculate the bill onto the new num of people
  calculateBill()
}

// divide the bill between fewer people 
const decreasePeople = () => {

  if (numberOfPeople <= 1) {
    alert('cannot go lower than 1')
    return //numberOfPeople
  }
  
  numberOfPeople--

  numberOfPeopleDiv.innerText = numberOfPeople
  
  calculateBill()
}

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

// Apply the input filter to your textboxes
setInputFilter(document.getElementById("billTotalInput"), function(value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) > 0 && parseInt(value) < 10000000); // Allow digits only, using a RegExp
});
setInputFilter(document.getElementById("tipInput"), function(value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) >= 0 && parseInt(value) <= 100); // Allow digits only, using a RegExp
});
