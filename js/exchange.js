const currencyBtn = document.getElementById('currency-button');

let currencies;
async function changeCurrency() {
    const newCurrency = document.querySelector('.exchange__currency').value;
    if (!currencies) {
        const response = await fetch('https://api.exchangerate-api.com/v6/latest');
        currencies = await response.json();
    }
    const rate = currencies.rates[newCurrency];
    addExchangeBlock(rate);
}
let block__id = 1;
const inputs = [];
function addExchangeBlock(rate){
    let productsHtml = document.querySelector('.exchange__container').innerHTML;
    productsHtml += `<div id = "${block__id}" class="currency-pair__container">
    <h4 class="currency-pair__naming">USD:${document.querySelector('.exchange__currency').value}</h4>
    <span class="currency-pair__second-element-pricing">${rate}</span>
    <input class="currency-pair__first-element-value" type="number" />
    <input class="currency-pair__second-element-value" type="number" />
  </div>`;
    
    document.querySelector('.exchange__container').innerHTML = productsHtml;
    const currentID = block__id;
    const currentEl = document.getElementById(currentID);
    const firsInpEl = currentEl.querySelector('.currency-pair__first-element-value');
    inputs.push(firsInpEl);
    firsInpEl.addEventListener('change', function() {
        convertCurency(currentID);
    });
    /*for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function() {
            convertCurency(i);
        });
    }*/
    block__id++;
}

function convertCurency(num){
    const currentEl = document.getElementById(num);
    const firstInpEl = currentEl.querySelector('.currency-pair__first-element-value');
    const textVal = currentEl.querySelector('.currency-pair__second-element-pricing').textContent; // Use querySelector instead of getElementsByClassName
    currentEl.querySelector('.currency-pair__second-element-value').value = (Number(textVal) * Number(firstInpEl.value)).toFixed(2);

}
// Add event listener to each input element
inputs.forEach(function(input, index) {
    input.addEventListener('change', function() {
        convertCurency(index + 1); // Index starts from 0, but block__id starts from 1
    });
});
// Event Listener
currencyBtn.addEventListener('click', changeCurrency);
