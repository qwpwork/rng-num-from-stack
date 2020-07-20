// btns objects
const btnPop        = document.getElementById('btnPop'),
      btnInit       = document.getElementById('btnInit'),
      btnReset      = document.getElementById('btnReset'),
      btnRemove     = document.getElementById('btnRemove'),
      btnDecrement  = document.getElementById('btnDecrement'),
      btnIncrement  = document.getElementById('btnIncrement');

// paragraphs
const numberList    = document.getElementById('numberList'),
      numberCurrent = document.getElementById('numberCurrent');

// inputs
const numberInput       = document.getElementById('numberInput'),
      inputRemoveNumber = document.getElementById('removeNumber');

// vars for double-tap on touch-devices
let timeout,
    lastTap = 0;

// object with logic for program
const studentsArray = {
  arrayOfNumbers: [0], // Sequential array, mostly from 1 to N
  currentItem: 'Null', // The last number received from the array

  // resets all fields in obj and update localStorage with DOM
  fieldsReset() {
    this.arrayOfNumbers = [];
    this.currentItem = '0';
    this.objectUpdate();
  },

  // get data from localStorage
  fieldsValueOnLoad() {
    if (localStorage.getItem('lastArrayLength') != undefined) {
      this.addNumbersToArray(parseInt(localStorage.getItem('lastArrayLength')));
      numberInput.value = parseInt(localStorage.getItem('lastArrayLength'));
    }
    this.currentItem = 0; // if localStorage.getItem == undefined => array is empty and last item is 0
    this.objectUpdate();
  },

  //push numbers into array [from 1 to length]
  addNumbersToArray(length) {
    if (length <= 200) { // for RAM economy

      //avoid concats of arrays
      this.fieldsReset();

      localStorage.setItem('lastArrayLength', length);
      for (let i = 1; i <= length; i++) {
        this.arrayOfNumbers.push(i);
      }

      this.objectUpdate();
    }
    else { // catch
      this.arrayOfNumbers = 'Input value must be below or equal 200';
    }
  },

  // get some element from array. This number is splice from array
  showNextNumber() {
    if(this.arrayOfNumbers.length > 0) {
      this.currentItem = parseInt(this.arrayOfNumbers.splice([Math.floor(Math.random()*this.arrayOfNumbers.length)], 1));
    }
    else { // catch
      this.currentItem = 'Array ended';
    }

    this.objectUpdate();
  },

  // remove desired number from array (numToRemove is desired number)
  removeNumber(numToRemove) {
    if (numToRemove > 0) {
      let getIndex = this.arrayOfNumbers.indexOf(numToRemove); //get index in array
      this.arrayOfNumbers.splice(getIndex, 1); //and splice
      this.objectUpdate();
    }
  },

  // remove last element from array
  decrement() {
    this.arrayOfNumbers.pop();
    this.objectUpdate();
  },

  // add an element to array. New element will be eq array[length] + 1
  increment() {
    this.arrayOfNumbers.push(this.arrayOfNumbers[this.arrayOfNumbers.length - 1] + 1);
    this.objectUpdate();
  },

  // update localStorage and Dom
  objectUpdate() { 
    numberInput.value = this.arrayOfNumbers.length;
    numberList.textContent = 'Remain list: ' + this.arrayOfNumbers;
    numberCurrent.textContent = 'Current num is: ' + this.currentItem;

    localStorage.setItem('lastArrayLength', this.arrayOfNumbers.length);
  }
}

// event listeners
window.addEventListener('DOMContentLoaded', function() {
  studentsArray.fieldsValueOnLoad();
});

btnPop.addEventListener('click', function() {
  studentsArray.showNextNumber();
});

btnInit.addEventListener('click', function() {
  studentsArray.addNumbersToArray(numberInput.value);
});

// large event-listener for doubletap on touch device
btnReset.addEventListener('touchend', function(event) {
  let currentTime = new Date().getTime(),
      tapLength = currentTime - lastTap;
  clearTimeout(timeout);
  if (tapLength < 500 && tapLength > 0) {
    studentsArray.fieldsReset();
  }
  else {
    timeout = setTimeout(function() {
      clearTimeout(timeout);
    }, 500);
  }
  lastTap = currentTime;
});

btnDecrement.addEventListener('click', function() {
  studentsArray.decrement();
});

btnIncrement.addEventListener('click', function() {
  studentsArray.increment();
});

btnReset.addEventListener('dblclick', function() {
  studentsArray.fieldsReset();
});

btnRemove.addEventListener('click', function() {
  studentsArray.removeNumber(parseInt(inputRemoveNumber.value));
});