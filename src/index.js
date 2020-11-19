import SourdoughForm  from '../src/form'

window.onload = () => {
    const form = new SourdoughForm();
    // form.clearBtn.addEventListener("click", function (event) {
    //     form.clearInputs(form.allInputFields)
    //     event.preventDefault();
    // });
    form.btnPercents.addEventListener("click", function (event) {
        form.setPercentsInput()
        return true;
    });
    form.btnWeights.addEventListener("click", function (event) {
        form.setWeightsInput();
        return true;
    });
    form.btnUseVitalWheatGluten.addEventListener("click", function (event) {
        form.setUseVitalWheatGluten(form.btnUseVitalWheatGluten.checked);
        return true;
    });
    form.setWeightsInput();
    window.form = form;
}


