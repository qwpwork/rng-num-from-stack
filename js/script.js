const btnPop              = document.getElementById('btnPop'),
      btnInit             = document.getElementById('btnInit'),
      btnReset            = document.getElementById('btnReset'),
      btnRemove           = document.getElementById('btnRemove'),
      numberList          = document.getElementById('numberList'),
      numberInput         = document.getElementById('numberInput'),
      btnDecrement        = document.getElementById('btnDecrement'),
      btnIncrement        = document.getElementById('btnIncrement'),
      numberCurrent       = document.getElementById('numberCurrent'),
      inputRemoveNumber   = document.getElementById('removeNumber');

let timeout,
    lastTap = 0;

const studentsArray = {
  arrayOfNumbers: [0],
  currentItem: 'Null',

  fieldsReset() {
    this.arrayOfNumbers = [];
    this.currentItem = '0';
    this.objectUpdate();
  },

  fieldsValueOnLoad() {
    if (localStorage.getItem('lastArrayLength') != undefined) {
      this.addNumbersToArray(parseInt(localStorage.getItem('lastArrayLength')));
      numberInput.value = parseInt(localStorage.getItem('lastArrayLength'));
    }
    this.currentItem = 0;
    this.objectUpdate();
  },

  addNumbersToArray(length) {
    if (length <= 200) {
      this.fieldsReset();

      localStorage.setItem('lastArrayLength', length);
      for (let i = 1; i <= length; i++) {
        this.arrayOfNumbers.push(i);
      }

      this.objectUpdate();
    }
    else {
      this.arrayOfNumbers = 'Input value must be below or equal 200'
    }
  },

  showNextNumber() {
    if(this.arrayOfNumbers.length > 0) {
      this.currentItem = parseInt(this.arrayOfNumbers.splice([Math.floor(Math.random()*this.arrayOfNumbers.length)], 1));
    }
    else {
      this.currentItem = 'Array ended'
    }

    this.objectUpdate();
  },

  removeNumber(numToRemove) {
    if (numToRemove > 0) {
      let getIndex = this.arrayOfNumbers.indexOf(numToRemove);
      this.arrayOfNumbers.splice(getIndex, 1);
      this.objectUpdate();
    }
  },

  decrement() {
    this.arrayOfNumbers.pop();
    this.objectUpdate();
  },

  increment() {
    this.arrayOfNumbers.push(this.arrayOfNumbers[this.arrayOfNumbers.length - 1] + 1);
    this.objectUpdate();
  },

  objectUpdate() {
    numberInput.value = this.arrayOfNumbers.length;
    numberList.textContent = 'Remain list: ' + this.arrayOfNumbers;
    numberCurrent.textContent = 'Current num is: ' + this.currentItem;

    localStorage.setItem('lastArrayLength', this.arrayOfNumbers.length);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  studentsArray.fieldsValueOnLoad();
});

btnPop.addEventListener('click', function() {
  studentsArray.showNextNumber();
});

btnInit.addEventListener('click', function() {
  studentsArray.addNumbersToArray(numberInput.value);
});

btnReset.addEventListener('touchend', function(event) {
  var currentTime = new Date().getTime();
  var tapLength = currentTime - lastTap;
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