/* eslint-disable no-undef */
const nameInput = document.getElementById("name");

nameInput.addEventListener("keypress", () => checkName());
nameInput.addEventListener("blur", () => checkName());

function checkName() {
  setTimeout(function () {
    let maskedName = maskName(nameInput.value);
    if (maskedName != nameInput.value) {
      nameInput.value = maskedName;
    }
  }, 1);
}

function maskName(char) {
  return char.toUpperCase();
}
