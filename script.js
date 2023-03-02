const bill = document.getElementById("bill");

const tipButtons = document.querySelectorAll(".tip-value");
const tipCustom = document.getElementById("tip-custom");

const people = document.getElementById("people");

const tipAmountValuePerPerson = document.getElementById("tip-amount-value");
const totalValuePerPerson = document.getElementById("total-value");

bill.addEventListener("input", () => {
  billValue = bill.value;
  calculateTip();
});

people.addEventListener("input", () => {
  peopleValue = people.value;
  calculateTip();
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

bill.value = "0.0";
people.value = "1";

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;
let tipCustomValue = 0;

function tipButtonClicked(event) {
  tipButtons.forEach((button) => {
    button.classList.remove("active");
    if (event.target.innerHTML == button.innerHTML) {
      button.classList.add("active");
      tipValue = parseFloat(button.innerHTML) / 100;
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
  }
}
