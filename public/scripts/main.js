/* eslint-disable no-undef */
const buttonCloseErrorWrapper = document.getElementById("close-error");
const closeCalcResults = document.getElementById("close-calc-results-wrapper");
const inputCallRoute = document.getElementById("callRoute");
const inputRouteDescription = document.getElementById("routeDescription");
const buttonGoToMyAccount = document.getElementById("go-to-my-account");

if (buttonGoToMyAccount) {
  buttonGoToMyAccount.addEventListener("click", () => (window.location.href = "/my-account"));
}

if (closeCalcResults) {
  closeCalcResults.addEventListener("click", () => removeCalcResultsWrapper());
}

if (buttonCloseErrorWrapper) {
  buttonCloseErrorWrapper.addEventListener("click", () => removeErrorWrapper());
}

if (inputCallRoute) {
  inputCallRoute.addEventListener("change", function () {
    const selectedRouteText = this.options[this.selectedIndex].text;
    inputRouteDescription.value = selectedRouteText;
  });
}

function removeErrorWrapper() {
  document.getElementById("message-wrapper").remove();
}

function removeCalcResultsWrapper() {
  document.getElementById("calc-wrapper").remove();
}
