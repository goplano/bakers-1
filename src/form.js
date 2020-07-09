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
    waterInput = null;
    mainFlourInput = null;
    addlFlourInput = null;
    saltInput = null;
    startInput = null;
    pWaterInput = null;
    pMainFlourInput = null;
    pAddlFlourInput = null;
    pSaltInput = null;
    pStartInput = null;
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

        this.waterInput = document.querySelector(this.selectors.water);
        this.mainFlourInput = document.querySelector(this.selectors.mainFlour);
        this.addlFlourInput = document.querySelector(this.selectors.addlFlour);
        this.saltInput = document.querySelector(this.selectors.salt);
        this.starterInput = document.querySelector(this.selectors.starter);

        this.pWaterInput = document.querySelector(this.selectors.pWater);
        this.pMainFlourInput = document.querySelector(this.selectors.pMainFlour);
        this.pAddlFlourInput = document.querySelector(this.selectors.pAddlFlour);
        this.pSaltInput = document.querySelector(this.selectors.pSalt);
        this.pStarterInput = document.querySelector(this.selectors.pStarter);

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
        this.setReadWrite(this.totalWeightInput);
        this.setReadWrite(this.totalWaterInput);
        this.setReadWrite(this.totalFlourInput);
        this.setReadWrite(this.totalHydrationInput);
        this.percentInputs.forEach((elem) => {
            this.setReadWrite(elem);
            elem.onblur = this.doPercentCalculations
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
        this.totalHydrationInput.value =  parseFloat(this.sourdough.totalHydration * 100 ).toFixed(0);
        //update individual percentages
        this.pWaterInput.value  = parseFloat(this.sourdough.percentWater * 100 ).toFixed(0);
        this.pMainFlourInput.value  = parseFloat(this.sourdough.percentMainFlour * 100 ).toFixed(0);
        this.pAddlFlourInput.value  = parseFloat(this.sourdough.percentAddlFlour * 100 ).toFixed(0);
        this.pStarterInput.value  = parseFloat(this.sourdough.percentStarter * 100 ).toFixed(0);
        this.pSaltInput.value  = parseFloat(this.sourdough.percentSalt * 100 ).toFixed(0);

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

