'use strict'

export default class SourdoughForm {
    allInputFields = null
// field lists
//     weightInputs = null;
//     percentInputs = null;
//     flourInputs = null;
//     totalHydrationInput = null;
//     totalFlourInput = null;
//     totalWaterInput = null;
    computationTypeDiv = null;
    // waterInput = null;
    // mainFlourInput = null;
    // addlFlourInput = null;
    // saltInput = null;
    // startInput = null;
    // pWaterInput = null;
    // pMainFlourInput = null;
    // pAddlFlourInput = null;
    // pSaltInput = null;
    // pStartInput = null;
// buttons
    clearBtn = null;
    sourdough = null;
// input fields
    inputFields = {
        weights: null,
        percents: null,
        flours: null,
        mainFlour: null,
        addlFlour: null,
        salt: null,
        water: null,
        starter: null,
        pMainFlour: null,
        pAddlFlour: null,
        pSalt: null,
        pWater: null,
        pStarter: null,
        totalWater: null,
        totalFlour: null,
        totalWeight: null,
        totalHydration: null,
    }
// selectors

    selectors = {
        weights: 'input[data-type=weights]',
        percents: 'input[data-type=percents]',
        flours: "input[name='flour[]']",
        mainFlour: '#mainflour',
        addlFlour: '#addlflour',
        salt: '#salt',
        water: '#water',
        starter: '#starter',
        pMainFlour: '#pmainflour',
        pAddlFlour: '#paddlflour',
        pSalt: '#psalt',
        pWater: '#pwater',
        pStarter: '#pstarter',
        totalWater: '#totalWater',
        totalFlour: '#totalFlour',
        totalWeight: '#totalweight',
        totalHydration: '#pTotalWater',
        clearBtn: '#btnClear',
        computationTypeDiv: '#computationType'
    };

    constructor(sd) {
        this.sourdough = sd;

        this.inputFields.weights = document.querySelectorAll(this.selectors.weights);
        this.inputFields.percents = document.querySelectorAll(this.selectors.percents);
        this.inputFields.flours = document.querySelectorAll(this.selectors.flours);
        this.clearBtn = document.querySelector(this.selectors.clearBtn);
        this.allInputFields = document.querySelectorAll('input');

        this.inputFields.totalFlour = document.querySelector(this.selectors.totalFlour);
        this.inputFields.totalWater = document.querySelector(this.selectors.totalWater);
        this.inputFields.totalWeight = document.querySelector(this.selectors.totalWeight);
        this.inputFields.totalHydration = document.querySelector(this.selectors.totalHydration);

        this.computationTypeDiv = document.querySelector(this.selectors.computationTypeDiv);

        this.inputFields.water = document.querySelector(this.selectors.water);
        this.inputFields.mainFlour = document.querySelector(this.selectors.mainFlour);
        this.inputFields.addlFlour = document.querySelector(this.selectors.addlFlour);
        this.inputFields.salt = document.querySelector(this.selectors.salt);
        this.inputFields.starter = document.querySelector(this.selectors.starter);

        this.inputFields.pWater = document.querySelector(this.selectors.pWater);
        this.inputFields.pMainFlour = document.querySelector(this.selectors.pMainFlour);
        this.inputFields.pAddlFlour = document.querySelector(this.selectors.pAddlFlour);
        this.inputFields.pSalt = document.querySelector(this.selectors.pSalt);
        this.inputFields.pStarter = document.querySelector(this.selectors.pStarter);

        this.getWeightsFromForm(sd);
        this.setWeightsInput();

    };


    clearInputs(nodeList) {
        nodeList.forEach((elem) => {
            elem.value = null;
        })
    };


    getSumOrValue(myList) {
        let sum = 0;
        if (typeof myList == 'string') {
            const node = document.querySelector(myList);
            const val = node.value;
            if (Number.isInteger(parseInt(val)))
                sum = parseInt(val);
        } else {
            const len = myList.length
            for (let i = len; i > 0; i--) {
                const val = myList[i - 1].value;
                if (Number.isInteger(parseInt(val)))
                    sum += parseInt(val);
            }
        }
        return sum;
    };


    getWeightsFromForm(sd) {
        sd.mainFlour = this.getSumOrValue(this.selectors.mainFlour);
        sd.addlFlour = this.getSumOrValue(this.selectors.addlFlour);
        sd.water = this.getSumOrValue(this.selectors.water);
        sd.salt = this.getSumOrValue(this.selectors.salt);
        sd.starter = this.getSumOrValue(this.selectors.starter);
    };


    setWeightsInput() {
        this.setReadOnly(this.inputFields.totalWeight);
        this.setReadOnly(this.inputFields.totalWater);
        this.setReadOnly(this.inputFields.totalFlour);
        this.setReadOnly(this.inputFields.totalHydration);
        this.setComputationTypeWeights()
        this.inputFields.percents.forEach((elem) => {
            this.setReadOnly(elem);
            // TODO - remove event handler?
        })
        this.inputFields.weights.forEach((elem) => {
            this.setReadWrite(elem);
            elem.onblur = this.doGramCalculations
        })
    };


    setPercentsInput() {
        this.setComputationTypeGrams();

        this.setReadWrite(this.inputFields.totalWeight);
        this.setReadWrite(this.inputFields.totalWater);
        this.setReadWrite(this.inputFields.totalFlour);
        this.setReadWrite(this.inputFields.totalHydration);
        this.inputFields.percents.forEach((elem) => {
            this.setReadWrite(elem);
            elem.onblur = this.doPercentCalculations
        })
        this.inputFields.weights.forEach((elem) => {
            this.setReadOnly(elem);
        })
    };


    setComputationTypeWeights() {
        this.computationTypeDiv.innerHTML = 'Calculating weights from percentages';

    };


    setComputationTypeGrams() {
        this.computationTypeDiv.innerHTML = 'Calculating percentages from weight';
    };


    doGramCalculations = () =>  {
        // update main, addl, water, salt and starter
        this.getWeightsFromForm(this.sourdough);
        // update total weight
        this.inputFields.totalWeight.value = this.sourdough.totalWeight;
        // update total water
        this.inputFields.totalWater.value = this.sourdough.totalWater;
        // update tot flour
        this.inputFields.totalFlour.value = this.sourdough.totalFlour
        // update total hydration
        this.inputFields.totalHydration.value =  parseFloat(this.sourdough.totalHydration * 100 ).toFixed(0);
        //update individual percentages
        this.inputFields.pWater.value  = parseFloat(this.sourdough.percentWater * 100 ).toFixed(0);
        this.inputFields.pMainFlour.value  = parseFloat(this.sourdough.percentMainFlour * 100 ).toFixed(0);
        this.inputFields.pAddlFlour.value  = parseFloat(this.sourdough.percentAddlFlour * 100 ).toFixed(0);
        this.inputFields.pStarter.value  = parseFloat(this.sourdough.percentStarter * 100 ).toFixed(0);
        this.inputFields.pSalt.value  = parseFloat(this.sourdough.percentSalt * 100 ).toFixed(0);

    };


    setReadOnly(elem) {
        elem.setAttribute('readonly', 'readonly')
        elem.setAttribute('tabindex', -1);
    };


    setReadWrite(elem) {
        elem.removeAttribute('readonly')
        elem.removeAttribute('tabindex')
    };
}

