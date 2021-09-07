/* eslint-disable no-undef */
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("keypress", () => checkPhone());
phoneInput.addEventListener("blur", () => checkPhone());

function checkPhone() {
  setTimeout(function () {
    let maskedNumber = maskPhone(phoneInput.value);
    if (maskedNumber != phoneInput.value) {
      phoneInput.value = maskedNumber;
    }
  }, 1);
}

function maskPhone(char) {
  let number = char.replace(/\D/g, "");
  number = number.replace(/^0/, "");
  if (number.length > 10) {
    number = number.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (number.length > 5) {
    number = number.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (number.length > 2) {
    number = number.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else if (number.length == 0) {
    number = null;
  } else {
    number = number.replace(/^(\d*)/, "($1");
  }
  return number;
}
