/* eslint-disable no-undef */
const buttonCloseErrorWrapper = document.getElementById("close-error");
const buttonCalculate = document.getElementById("calcForm");
const closeCalcResults = document.getElementById("close-calc-results-wrapper");

if (closeCalcResults) {
  closeCalcResults.addEventListener("click", () => HideCalcResultsWrapper());
}

if (buttonCalculate) {
  console.log("cheguei aqui");
  buttonCalculate.addEventListener("click", () => calculateCallCosts());
}

if (buttonCloseErrorWrapper) {
  buttonCloseErrorWrapper.addEventListener("click", () => RemoveErrorWrapper());
}

function RemoveErrorWrapper() {
  document.getElementById("message-wrapper").remove();
}

function HideCalcResultsWrapper() {
  document.getElementById("calc-results-wrapper").style.visibility = "hidden";
}

function calculateCallCosts() {
  const selectBoxCallOrigin = document.getElementById("call-origin");
  const callOriginValue = selectBoxCallOrigin.options[selectBoxCallOrigin.selectedIndex].value;
  const selectBoxCallDestination = document.getElementById("call-destination");
  const callDestinationValue =
    selectBoxCallDestination.options[selectBoxCallDestination.selectedIndex].value;
  const callDuration = document.getElementById("call-duration").value;
  const selectBoxFaleMaisPlan = document.getElementById("fale-mais-plan");
  const faleMaisPlanValue =
    selectBoxFaleMaisPlan.options[selectBoxFaleMaisPlan.selectedIndex].value;
  const calcResultsTextComFaleMais = document.getElementById("calc-results-text-com-fale-mais");
  const calcResultsTextSemFaleMais = document.getElementById("calc-results-text-sem-fale-mais");

  calcResultsTextComFaleMais.innerHTML = `<strong>Com Fale Mais</strong><br /> O custo da sua ligação com o plano ${faleMaisPlanValue}`;
  calcResultsTextSemFaleMais.innerHTML = `Estou escrevendo este texto apenas como testeEstou escrevendo este texto apenas como testeEstou escrevendo este texto apenas como testeEstou escrevendo este texto apenas como testeEstou escrevendo este texto apenas como teste`;
  document.getElementById("calc-results-wrapper").style.visibility = "visible";
}
