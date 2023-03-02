const bill = document.getElementById("bill");

const tipButtons = document.querySelectorAll(".tip-value");
const tipCustom = document.getElementById("tip-custom");

const people = document.getElementById("people");

const tipAmountValuePerPerson = document.getElementById("tip-amount-value");
const totalValuePerPerson = document.getElementById("total-value");

const resetButton = document.getElementById("reset-btn");

const errorMsg = document.querySelector(".error-msg");

bill.addEventListener("input", () => {
  billValue = bill.value;
  if (billValue.startsWith("00")) {
    billValue = "0";
    bill.classList.add("error");
  } else {
    bill.classList.remove("error");
  }
  calculateTip();
});

people.addEventListener("input", () => {
  peopleValue = people.value;
  if (peopleValue.startsWith("0")) {
    errorMsg.classList.add("visible");
    people.classList.add("error");
    tipAmountValuePerPerson.innerHTML = "$" + (0.0).toFixed(2);
    totalValuePerPerson.innerHTML = "$" + (0.0).toFixed(2);
  } else {
    calculateTip();
    errorMsg.classList.remove("visible");
    people.classList.remove("error");
  }
});

tipButtons.forEach((button) =>
  button.addEventListener("click", tipButtonClicked)
);

tipCustom.addEventListener("input", () => {
  tipValue = tipCustom.value / 100;
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  calculateTip();
});

tipAmountValuePerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalValuePerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = "";
let peopleValue = "";
let tipValue = "";
let tipCustomValue = "";

function tipButtonClicked(event) {
  tipButtons.forEach((button) => {
    button.classList.remove("active");

    if (event.target.innerHTML == button.innerHTML) {
      button.classList.add("active");
      tipValue = parseFloat(button.innerHTML) / 100;
      tipCustom.value = "Custom";
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = billValue / peopleValue + tipAmount;
    tipAmountValuePerPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalValuePerPerson.innerHTML = "$" + total.toFixed(2);
    resetButton.classList.add("completed");
  }
}

resetButton.addEventListener("click", () => {
  tipAmountValuePerPerson.innerHTML = "$" + (0.0).toFixed(2);
  totalValuePerPerson.innerHTML = "$" + (0.0).toFixed(2);
  errorMsg.classList.remove("visible");

  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });
});
