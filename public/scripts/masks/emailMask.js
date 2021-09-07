/* eslint-disable no-undef */
const emailInput = document.getElementById("email");

emailInput.addEventListener("keypress", () => checkEmail());
emailInput.addEventListener("blur", () => checkEmail());

function checkEmail() {
  setTimeout(function () {
    let maskedName = maskEmail(emailInput.value);
    if (maskedName != emailInput.value) {
      emailInput.value = maskedName;
    }
  }, 1);
}

function maskEmail(char) {
  return char.toLowerCase();
}
