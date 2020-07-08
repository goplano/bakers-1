'use strict'

export default class SourdoughForm {
    allInputFields = null
// field lists
    weightInputs = null;
    percentInputs = null;
    flourInputs = null;
    totalHydrationInput = null;
    totalFlourInput = null;
    totalWaterInput = null;
    totalWeightInput = null;
    computationTypeDiv = null;
// buttons
    clearBtn = null;
    sourdough = null;

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
        totalWater: '#totalWater',
        totalFlour: '#totalFlour',
        totalWeight: '#totalweight',
        totalHydration: '#pTotalWater',
        clearBtn: '#btnClear',
        computationTypeDiv: '#computationType'
    };

    constructor(sd) {
        this.sourdough = sd;

        this.weightInputs = document.querySelectorAll(this.selectors.weights);
        this.percentInputs = document.querySelectorAll(this.selectors.percents);
        this.flourInputs = document.querySelectorAll(this.selectors.flours);
        this.clearBtn = document.querySelector(this.selectors.clearBtn);
        this.allInputFields = document.querySelectorAll('input');
        this.totalFlourInput = document.querySelector(this.selectors.totalFlour);
        this.totalWaterInput = document.querySelector(this.selectors.totalWater);
        this.totalWeightInput = document.querySelector(this.selectors.totalWeight);
        this.totalHydrationInput = document.querySelector(this.selectors.totalHydration);
        this.computationTypeDiv = document.querySelector(this.selectors.computationTypeDiv);


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
        this.setReadOnly(this.totalWeightInput);
        this.setReadOnly(this.totalWaterInput);
        this.setReadOnly(this.totalFlourInput);
        this.setReadOnly(this.totalHydrationInput);
        this.setComputationTypeWeights()
        this.percentInputs.forEach((elem) => {
            this.setReadOnly(elem);
            // TODO - remove event handler?
        })
        this.weightInputs.forEach((elem) => {
            this.setReadWrite(elem);
            elem.onblur = this.doGramCalculations
        })
    };


    setPercentsInput() {
        this.setComputationTypeGrams();
        this.percentInputs.forEach((elem) => {
            this.setReadWrite(elem);
            // elem.onblur = doPercentCalculations
        })
        this.weightInputs.forEach((elem) => {
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
        this.totalWeightInput.value = this.sourdough.totalWeight;
        // update total water
        this.totalWaterInput.value = this.sourdough.totalWater;
        // update tot flour
        this.totalFlourInput.value = this.sourdough.totalFlour
        // update total hydration
        this.totalHydrationInput.value =  parseFloat(this.sourdough.totalHydration * 100 ).toFixed(0); ;
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

