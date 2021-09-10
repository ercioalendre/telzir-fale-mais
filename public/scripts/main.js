/* eslint-disable no-undef */
const buttonCloseErrorWrapper = document.getElementById("close-error");
const closeCalcResults = document.getElementById("close-calc-results-wrapper");

if (closeCalcResults) {
  closeCalcResults.addEventListener("click", () => RemoveCalcResultsWrapper());
}

if (buttonCloseErrorWrapper) {
  buttonCloseErrorWrapper.addEventListener("click", () => RemoveErrorWrapper());
}

function RemoveErrorWrapper() {
  document.getElementById("message-wrapper").remove();
}

function RemoveCalcResultsWrapper() {
  document.getElementById("calc-wrapper").remove();
}
