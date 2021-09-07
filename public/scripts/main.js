/* eslint-disable no-undef */
const buttonCloseErrorWrapper = document.getElementById("close-error");

if (buttonCloseErrorWrapper) {
  buttonCloseErrorWrapper.addEventListener("click", () => RemoveErrorWrapper());
}

function RemoveErrorWrapper() {
  document.getElementById("message-wrapper").remove();
}
