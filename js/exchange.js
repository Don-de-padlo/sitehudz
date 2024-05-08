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
function addExchangeBlock(rate){
    let productsHtml = document.querySelector('.exchange__container').innerHTML;
    productsHtml += `<div class="currency-pair__container">
    <h4 class="currency-pair__naming">USD:${document.querySelector('.exchange__currency').value}</h4>
    <span class="currency-pair__second-element-pricing"> ${document.querySelector('.exchange__currency').value} : ${rate}</span>
    <input class="currency-pair__first-element-value" type="number" />
    <input class="currency-pair__second-element-value" type="number" />
  </div>`;
    document.querySelector('.exchange__container').innerHTML = productsHtml;
}

// Event Listener
currencyBtn.addEventListener('click', changeCurrency);
