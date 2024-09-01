const baseUrl = "https://v6.exchangerate-api.com/v6/c833a2d0c62c380f04fbf089/latest/USD";
const dropdownSelect = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdownSelect) {
    for (country in countryList) {
        // console.log(country, countryList[country]);
        let newOption = document.createElement("option");
        newOption.value = country;
        newOption.innerText = country;
        select.append(newOption);
        if (select.name === "from" && country === "USD") {
            newOption.selected = "selected"
        }
        if (select.name === "to" && country === "INR") {
            newOption.selected = "selected"
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

let updateFlag = (event) => {
    console.log(event.value)
    let currencyCode = event.value;
    let countryCode = countryList[currencyCode];
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = event.parentElement.querySelector("img");
    img.src = newSrc;
}

let updateExchangeRate = async () => {
    let input = document.querySelector("form input");
    let amount = input.value;
    console.log(amount);
    if (amount == "" || amount < 1) {
        input.value = 1;
        amount = 1;
    }
    console.log(fromCurr.value, toCurr.value)
    console.log(fromCurr, toCurr)
    const url = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    console.log(url);
    try {
        let responce = await fetch(url);
        let data = await responce.json();
        let rate = data[toCurr.value.toLowerCase()];
        console.log(rate);
        finalAmount = amount * rate;
        msg.innerText = `${amount} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
    }
    catch (error) {
        console.error(error);
    }
};

btn.addEventListener("click", (element) => {
    console.log("btn has been clicked");
    element.preventDefault();
    updateExchangeRate();

});
window.addEventListener("load", () => {
    updateExchangeRate();
})
