import SourdoughForm from '../src/form';
import doGramCalculations from '../src/form';
import Sourdough from "../src/sourdough";

const sampleHTML = `
<div id="computationType">Not set</div>
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
            <td><input type="text" id="mainflour" data-type="weights" name="flour[]" value="500"></td>
            <td><label for="pmainflour"></label><input type="text" id="pmainflour" data-type="percents" name="pflour[]">
            </td>
        </tr><tr>
            <td><label for="addlflour">flour</label></td>
            <td><input type="text" id="addlflour" data-type="weights" name="flour[]" value="100"></td>
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
    `;


test('can find all html elements on initialize', () => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    expect(form.inputFields.weights.length).toBe(5);
    expect(form.inputFields.percents.length).toBe(5);
    const percentElement = form.inputFields.percents[0];
    expect(percentElement.getAttribute('data-type')).toBe('percents')
    const weightElement = form.inputFields.weights[0];
    expect(weightElement.getAttribute('data-type')).toBe('weights')
    expect(form.inputFields.flours.length).toBe(2)
})
test('it can sum flour values', () => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    expect(form.getSumOrValue(form.inputFields.flours)).toBe(600);
})
test('it can sum input values even if empty', () => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    expect(form.getSumOrValue(form.inputFields.weights)).toBe(1060);
})
test('it can clear values on the form', () => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    expect(form.getSumOrValue(form.inputFields.weights)).toBe(1060);
    form.clearInputs(form.allInputFields);
    expect(form.getSumOrValue(form.inputFields.weights)).toBe(0);
})
test('initialization will populate the sourdough values',() => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    expect(form.sourdough.mainFlour).toBe(500);
    expect(form.sourdough.addlFlour).toBe(100);
    expect(form.sourdough.water).toBe(300);
    expect(form.sourdough.salt).toBe(10);
    expect(form.sourdough.starter).toBe(150);
})
test('gram calculations will update totals fields',() => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    form.doGramCalculations();
    expect(form.inputFields.totalFlour.value).toBe("675");
    expect(form.inputFields.totalWater.value).toBe("375");
    expect(form.inputFields.totalWeight.value).toBe("1060");
    expect(form.inputFields.totalHydration.value).toBe("56");
})
test('you can switch to percentage to calculate weights',() => {
    document.body.innerHTML = sampleHTML;
    const form =  new SourdoughForm(new Sourdough());
    expect(form.inputFields.totalFlour.getAttribute('readonly')).toBe('readonly')
    expect(form.inputFields.totalHydration.getAttribute('readonly')).toBe('readonly')
    expect(form.computationTypeDiv.innerHTML).toBe('Calculating weights from percentages')
    form.doGramCalculations();
    expect(form.inputFields.totalFlour.value).toBe("675");
    expect(form.inputFields.totalWater.value).toBe("375");
    expect(form.inputFields.totalWeight.value).toBe("1060");
    expect(form.inputFields.totalHydration.value).toBe("56");

    form.setPercentsInput();
    // weight inputs should be readonly
    form.inputFields.weights.forEach((elem) => {
        expect(elem.getAttribute('readonly')).toBe('readonly')
    })
    // percentage inputs should be writable
    form.inputFields.percents.forEach((elem) => {
        expect(elem.getAttribute('readonly')).not.toBe('readonly')
    })
    // total weight should be writable
    // total hydration should be writable
    expect(form.inputFields.totalFlour.getAttribute('readonly')).not.toBe('readonly')
    expect(form.inputFields.totalHydration.getAttribute('readonly')).not.toBe('readonly')


    expect(form.inputFields.totalFlour.value).toBe("675");
    expect(form.inputFields.totalWater.value).toBe("375");
    expect(form.inputFields.totalWeight.value).toBe("1060");
    expect(form.inputFields.totalHydration.value).toBe("56");
    expect(form.inputFields.pMainFlour.value).toBe("74");
    expect(form.inputFields.pStarter.value).toBe("22");
    expect(form.inputFields.pAddlFlour.value).toBe("15");
    expect(form.inputFields.pWater.value).toBe("44");
    expect(form.inputFields.pSalt.value).toBe("1");
    expect(form.computationTypeDiv.innerHTML).toBe('Calculating percentages from weight')

})
 test('it will skip over non-numeric values',() => {
     document.body.innerHTML = sampleHTML;
     const form =  new SourdoughForm(new Sourdough());
     form.inputFields.mainFlour.value = "twelve"
     form.inputFields.addlFlour.value = "100"
     form.inputFields.starter.value = "yeast"
     form.doGramCalculations();
     expect(form.inputFields.totalFlour.value).toBe("100");
 })