import SourdoughForm  from '../src/form'
import Sourdough from "./sourdough";
window.onload = () => {
    const form = new SourdoughForm( new Sourdough());
    form.clearBtn.addEventListener("click", function (event) {
        form.clearInputs(form.allInputFields)
        event.preventDefault();
    })
}


function updatePercentage(name, totalFlour, decimals = 0) {
    const name1 = `#${name}`,
        name2 = `#p${name}`,
        elem = document.querySelector(name1),
        elem2 = document.querySelector(name2);
    if(Number.isInteger(parseInt(elem.value)) ) {
        elem2.value = parseFloat(parseInt(elem.value) / totalFlour * 100).toFixed(decimals);
    }
}

function computePercentages(totalFlour) {
    updatePercentage('mainflour', totalFlour);
    updatePercentage('addlflour', totalFlour);
    updatePercentage('water', totalFlour);
    updatePercentage('salt', totalFlour);
    updatePercentage('starter', totalFlour);
}

