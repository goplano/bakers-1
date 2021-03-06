import SourdoughForm from '../src/form';

const sampleHTML = `
<span id="computationType">Not set</span>
<div class="switch-field">
    <input type="radio" id="btnWeights" name="calctype" value="weights" checked/>
    <label for="btnWeights">Weights</label>
    <input type="radio" id="btnPercents" name="calctype" value="percents" />
    <label for="btnPercents">Percents</label>
</div>
    <div>
        <label for="totalweight">Total weight: </label>
        <input type="text" name="totalweight" id="totalweight">
    </div>
    <div>
        <label for="totalFlour">Total flour: </label>
        <input type="text" name="totalFlour" id="totalFlour">
    </div>
    <div>
        <label for="totalWater">Total water: </label>
        <input type="text" name="totalWater" id="totalWater">
    </div>
    <div>
        <label for="pTotalWater">Total hydration: </label>
        <input type="text" name="pTotalWater" id="pTotalWater">
    </div>
        <table>
        <thead>
        <tr>
            <td>Ingredient</td>
            <td>Grams</td>
            <td>%</td>
        </tr>
        </thead>
        <tbody>
        <tr data-type="flour">
            <td><label for="mainflour"></label>flour</td>
            <td><input type="text" id="mainflour" data-type="weights" name="flour[]" value="600"></td>
            <td><label for="pmainflour"></label><input type="text" id="pmainflour" data-type="percents" name="pflour[]">
            </td>
        </tr>
        <tr id="vwg-input-row">
            <td><label for="addlflour">VWG</label></td>
            <td><input type="text" id="addlflour" data-type="weights" name="flour[]"></td>
            <td><label for="paddlflour"></label><input type="text" id="paddlflour" data-type="percents" name="pflour[]">
            </td>
        </tr>
        <tr data-type="water">
            <td><label for="water">water</label></td>
            <td><input type="text" id="water" data-type="weights" name="water" value="300"></td>
            <td><label for="pwater"></label><input type="text" id="pwater" data-type="percents" name="pwater"></td>
        </tr>
        <tr data-type="salt">
            <td><label for="salt">salt</label></td>
            <td><input type="text" id="salt" data-type="weights" name="salt" value="10"></td>
            <td><label for="psalt"></label><input type="text" id="psalt" data-type="percents" name="psalt"></td>
        </tr>
        <tr data-type="starter">
            <td><label for="starter">starter</label></td>
            <td><input type="text" id="starter" data-type="weights" name="starter" value="150"></td>
            <td><label for="pstarter"></label><input data-type="percents" id="pstarter" name="pstarter" type="text">
            </td>
        </tr>
        </tbody>
    </table>
    <div>
    <input id="btnUseVitalWheatGluten" class="toggle" type="checkbox" name="vwg" />
    <label for="btnUseVitalWheatGluten" title="Vital wheat gluten adds protein and a little more structure.">Use Vital Wheat Gluten</label>
</div>
    `;


test('gram calculations will update totals fields',() => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm();
    form.doCalculations();
    expect(form.inputFields.totalFlour.value).toBe("675");
    expect(form.inputFields.totalWater.value).toBe("375");
    expect(form.inputFields.totalWeight.value).toBe("1060");
    expect(form.inputFields.totalHydration.value).toBe("56");
})
test('you can switch to percentage to calculate weights',() => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm();
    form.setPercentsInput();


    expect(form.inputFields.totalWeight.getAttribute('readonly')).not.toBe('readonly')
    expect(form.inputFields.totalHydration.getAttribute('readonly')).not.toBe('readonly')

    form.sourdough.percentLevain = .22  ;
    form.inputFields.totalWeight.value =  "1060";
    form.inputFields.totalHydration.value =  "56";
    form.sourdough.percentLevain = .22;
    form.doCalculations();

    expect(form.inputFields.totalFlour.value).toBe("679");
    expect(form.inputFields.totalWater.value).toBe("381");
    expect(form.inputFields.totalWeight.value).toBe("1060");
    expect(form.inputFields.starter.value).toBe("149");

    // form.setPercentsInput();
    // // weight inputs should be readonly
    // form.inputFields.weights.forEach((elem) => {
    //     expect(elem.getAttribute('readonly')).toBe('readonly')
    // })
    // // percentage inputs should be writable
    // form.inputFields.percents.forEach((elem) => {
    //     expect(elem.getAttribute('readonly')).not.toBe('readonly')
    // })
    // // total weight should be writable
    // // total hydration should be writable
    // expect(form.inputFields.totalFlour.getAttribute('readonly')).not.toBe('readonly')
    // expect(form.inputFields.totalHydration.getAttribute('readonly')).not.toBe('readonly')
    //
    //
    // expect(form.inputFields.totalFlour.value).toBe("675");
    // expect(form.inputFields.totalWater.value).toBe("375");
    // expect(form.inputFields.totalWeight.value).toBe("1060");
    // expect(form.inputFields.totalHydration.value).toBe("56");
    // expect(form.inputFields.pMainFlour.value).toBe("74");
    // expect(form.inputFields.pStarter.value).toBe("22");
    // expect(form.inputFields.pAddlFlour.value).toBe("15");
    // expect(form.inputFields.pWater.value).toBe("44");
    // expect(form.inputFields.pSalt.value).toBe("1");
    // expect(form.computationTypeDiv.innerHTML).toBe('Calculating percentages from weight')

})
test('it will skip over non-numeric values',() => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm();
    form.setPercentsInput();
    form.inputFields.totalWeight.value = "twelve"
    form.inputFields.totalHydration.value = "six"
    form.doCalculations();
    expect(form.inputFields.mainFlour.value).toBe("0");
})
test('it will do weights based on percentages', () => {

})