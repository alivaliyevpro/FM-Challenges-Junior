const people = document.getElementById("people-input");
const bill = document.getElementById("bill");
const tipAmount = document.getElementById("tip-amount");
const customTip = document.getElementById("custom");
const total = document.getElementById("total-amount");
const numOfPeople = document.querySelector(".num-of-people");
const resetAll = document.querySelector(".reset");
const tips = document.querySelectorAll(".tip");

let billPerPerson = 0.0;
let tipPerPerson = 0;
let peopleValue = 0;

bill.addEventListener("input", setBillValue);
people.addEventListener("input", setPeopleValue);
tips.forEach((btn) => {
  btn.addEventListener("click", buttonClick);
});
customTip.addEventListener("input", setCustomValue);

resetAll.addEventListener("click", reset);
disableButton();

function validateFloat(s) {
  let rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function validateInt(s) {
  let rgx = /^[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  if (bill.value == "") {
    tipAmount.innerHTML = `$0.00`;
    total.innerHTML = `$0.00`;
  }

  billPerPerson = parseFloat(bill.value);

  calculateTip();
  disableButton();
}

function buttonClick(e) {
  tips.forEach((btn) => {
    btn.classList.remove("active");
    if (e.target.innerHTML == btn.innerHTML) {
      btn.classList.add("active");
      tipPerPerson = parseFloat(btn.innerHTML) / 100;
    }
  });

  customTip.value = "";
  calculateTip();
}

function setCustomValue() {
  if (!validateInt(customTip.value)) {
    customTip.value = customTip.value.substring(0, customTip.value.length - 1);
  }

  tipPerPerson = parseFloat(customTip.value / 100);

  if (customTip.value !== "") {
    calculateTip();
    disableButton();
  }
}

function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  if (peopleValue == 0) {
    numOfPeople.classList.add("error");
    setTimeout(() => {
      numOfPeople.classList.remove("error");
    }, 2000);
  }

  calculateTip();
  disableButton();
}

function calculateTip() {
  if (peopleValue >= 1 && bill.value != "") {
    let tipAmountValue = (billPerPerson * tipPerPerson) / peopleValue;
    let totalValue = (billPerPerson * (tipPerPerson + 1)) / peopleValue;
    tipAmount.innerHTML = `$${tipAmountValue.toFixed(2)}`;
    total.innerHTML = `$${totalValue.toFixed(2)}`;
    resetAll.classList.remove("disabled");
  } else {
    tipAmount.innerHTML = `$0.00`;
    total.innerHTML = `$0.00`;
  }
}

function reset() {
  bill.value = "";
  people.value = "";
  peopleValue = 0;
  tips.forEach((btn) => {
    btn.classList.remove("active");
  });
  tipPerPerson = 0;
  customTip.value = "";
  tipAmount.innerHTML = `$0.00`;
  total.innerHTML = `$0.00`;
  resetAll.classList.add("disabled");
}

function disableButton() {
  if (bill.value == "" && people.value == "" && customTip.value == "") {
    resetAll.classList.add("disabled");
  } else {
    resetAll.classList.remove("disabled");
  }
}
