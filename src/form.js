'use strict'
import Sourdough from "./sourdough";
import SourdoughPercents from './sourdough_percents'
/*
 * This class handles all things related to the form and form fields
 */
export default class SourdoughForm {
    allInputFields = null
    calcTypes = new Set(['percents', 'weights']);
    computationTypeDiv = null;
    doCalculations = null;
    calcType = null;
// buttons
    clearBtn = null;
    sourdough = null;
    // input row
    vwgRow = null;
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
        btnPercents: '#btnPercents',
        btnWeights: '#btnWeights',
        btnUseVitalWheatGluten: '#btnUseVitalWheatGluten',
        computationTypeDiv: '#computationType',
        vwgRow: '#vwg-input-row'
    };

    /*
     * The constructor finds all of the fields and sets the computation for
     * getting percentages from weights
     */
    constructor() {
        this.vwgRow = document.querySelector(this.selectors.vwgRow);

        this.inputFields.weights = document.querySelectorAll(this.selectors.weights);
        this.inputFields.percents = document.querySelectorAll(this.selectors.percents);
        this.inputFields.flours = document.querySelectorAll(this.selectors.flours);
        this.clearBtn = document.querySelector(this.selectors.clearBtn);
        this.btnPercents = document.querySelector(this.selectors.btnPercents);
        this.btnWeights = document.querySelector(this.selectors.btnWeights);
        this.btnUseVitalWheatGluten = document.querySelector(this.selectors.btnUseVitalWheatGluten);
        this.allInputFields = document.querySelectorAll('input');

        this.inputFields.totalFlour = document.querySelector(this.selectors.totalFlour);
        this.inputFields.totalWater = document.querySelector(this.selectors.totalWater);
        this.inputFields.totalWeight = document.querySelector(this.selectors.totalwWeight);
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

        this.setWeightsInput();
        this.setUseVitalWheatGluten(this.sourdough.useVitalWheatGluten);
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

    /*
     *
     */
    getWeightsFromForm() {
        const sd = this.sourdough;
        sd.mainFlour = isNaN(this.inputFields.mainFlour.value)?0:+this.inputFields.mainFlour.value;
        sd.addlFlour = isNaN(this.inputFields.addlFlour.value)?0:+this.inputFields.addlFlour.value;
        sd.water = isNaN(this.inputFields.water.value)?0:+this.inputFields.water.value;
        sd.salt = isNaN(this.inputFields.salt.value)?0:+this.inputFields.salt.value;
        sd.starter = isNaN(this.inputFields.starter.value)?0:+this.inputFields.starter.value;
    };

    getPercentsFromForm() {
        const sd = this.sourdough;
        sd.totalWeight = this.getSumOrValue(this.selectors.totalWeight);
        sd.totalHydration = this.getSumOrValue(this.selectors.totalHydration) / 100;
        sd.percentSalt = this.inputFields.pSalt.value / 100;
        sd.percentLevain = this.inputFields.pStarter.value / 100;
    };

    setWeightsInput() {
        if (this.calcType === 'weights') {
            return;
        }
        this.calcType = 'weights';
        this.sourdough = new Sourdough({
            mainFlour: this.inputFields.mainFlour.value,
            addlFlour: this.inputFields.addlFlour.value,
            water: this.inputFields.water.value,
            salt: this.inputFields.salt.value,
            starter: this.inputFields.starter.value
        });
        this.makeTotalWeightsReadonly();
        this.displayComputationTypeGrams()
        this.makePercentFieldsReadonly();
        this.doCalculations = this.calculatePercentsFromWeights;
        this.makeWeightFieldsReadble();
        this.setUseVitalWheatGluten(this.sourdough.useVitalWheatGluten);
        this.getWeightsFromForm();
    };

    makeWeightFieldsReadble() {
        this.inputFields.weights.forEach((elem) => {
            this.setReadWrite(elem);
            elem.addEventListener("blur", this.doCalculations)
        });
    }

    makePercentFieldsReadonly() {
        this.inputFields.percents.forEach((elem) => {
            this.setReadOnly(elem);
            elem.removeEventListener("blur", this.calculateWeightsFromPercents)
        })
    }

    makeTotalWeightsReadonly() {
        this.setReadOnly(this.inputFields.totalWeight);
        this.setReadOnly(this.inputFields.totalWater);
        this.setReadOnly(this.inputFields.totalFlour);
        this.setReadOnly(this.inputFields.totalHydration);
    }

    /*
         * This tells the sourdough object to compute the flour using VWG
         */
    setUseVitalWheatGluten(on) {
        this.sourdough.setuUseVitalWheatGluten(on);
        this.inputFields.addlFlour.value = this.sourdough.addlFlour;
        this.inputFields.mainFlour.value = this.sourdough.mainFlour;
        if (this.sourdough.useVitalWheatGluten !== true) {
            this.btnUseVitalWheatGluten.removeAttribute('checked');
            this.vwgRow.setAttribute('hidden', 'hidden');
        } else {
            this.btnUseVitalWheatGluten.setAttribute('checked', 'checked');
            this.vwgRow.removeAttribute('hidden');
        }

        // if (on === true) {
        //     console.log("PROTEIN!");
        // } else {
        //     console.log(on);
        // }
        this.doCalculations();
    }

    setPercentsInput() {
        if (this.calcType === 'percents') {
            return;
        }
        this.doCalculations = this.calculateWeightsFromPercents;
        this.calcType = 'percents';
        this.sourdough = new SourdoughPercents({
            totalWeight: this.sourdough.totalWeight,
            totalHydration: this.sourdough.totalHydration,
            useVitalWheatGluten: this.sourdough.useVitalWheatGluten
        });
        if(this.inputFields.pSalt.value == 0) {
            this.inputFields.pSalt.value = this.sourdough.percentSalt * 100;
        }
        if(this.inputFields.pStarter.value == 0) {
            this.inputFields.pStarter.value = this.sourdough.percentLevain * 100;
        }
        this.displayComputationTypePercentages();
        this.makeTotalWeightsReadable();
        this.makePercentageFieldsReadable();
        this.makeWeightFieldsReadonly();
        this.getPercentsFromForm(this.sourdough);
    };

    makeWeightFieldsReadonly() {
        this.inputFields.weights.forEach((elem) => {
            this.setReadOnly(elem);
            elem.removeEventListener("blur", this.calculatePercentsFromWeights)
        });
    }

    makePercentageFieldsReadable() {
        const inputFields = [ this.inputFields.pStarter, this.inputFields.pSalt];
        inputFields.forEach((elem) => {
            this.setReadWrite(elem);
            elem.addEventListener("blur", this.doCalculations)
        })
    }

    makeTotalWeightsReadable() {
        const inputFields = [ this.inputFields.totalWeight, this.inputFields.totalHydration];
        inputFields.forEach((elem) => {
            this.setReadWrite(elem);
            elem.addEventListener("blur", this.doCalculations)
        })
    }

    displayComputationTypePercentages() {
        this.computationTypeDiv.innerHTML = 'Calculating weights from ';

    }


    displayComputationTypeGrams() {
        this.computationTypeDiv.innerHTML = 'Calculating percentages from ';
    };

    calculateWeightsFromPercents = () => {
        this.getPercentsFromForm()
        // update grams
        this.inputFields.totalFlour.value = this.sourdough.totalFlour;
        this.inputFields.totalWater.value = this.sourdough.totalWater;
        this.inputFields.starter.value = this.sourdough.starter;
        this.inputFields.mainFlour.value = this.sourdough.mainFlour;
        this.inputFields.addlFlour.value = this.sourdough.addlFlour;
        this.inputFields.salt.value = this.sourdough.salt;
        this.inputFields.water.value = this.sourdough.water;
        // this.inputFields.addlFlour.value = 0;
        //update individual percentages
        this.inputFields.pWater.value = parseFloat(this.sourdough.percentWater * 100).toFixed(0);
        this.inputFields.pMainFlour.value = parseFloat(this.sourdough.percentMainFlour * 100).toFixed(0);
        this.inputFields.pAddlFlour.value = parseFloat(this.sourdough.percentAddlFlour * 100).toFixed(0);
        this.inputFields.pStarter.value = parseFloat(this.sourdough.percentStarter * 100).toFixed(0);
        this.inputFields.pSalt.value = parseFloat(this.sourdough.percentSalt * 100).toFixed(0);
    }
    calculatePercentsFromWeights = () => {
        console.log('calculatePercentsFromWeights');
        // update main, addl, water, salt and starter
        this.getWeightsFromForm(this.sourdough);
        // update total weight
        this.inputFields.totalWeight.value = this.sourdough.totalWeight;
        // update total water
        this.inputFields.totalWater.value = this.sourdough.totalWater;
        // update tot flour
        this.inputFields.totalFlour.value = this.sourdough.totalFlour
        // update total hydration
        this.inputFields.totalHydration.value = parseFloat(this.sourdough.totalHydration * 100).toFixed(0);
        //update individual percentages
        this.inputFields.pWater.value = parseFloat(this.sourdough.percentWater * 100).toFixed(0);
        this.inputFields.pMainFlour.value = parseFloat(this.sourdough.percentMainFlour * 100).toFixed(0);
        this.inputFields.pAddlFlour.value = parseFloat(this.sourdough.percentAddlFlour * 100).toFixed(0);
        this.inputFields.pStarter.value = parseFloat(this.sourdough.percentStarter * 100).toFixed(0);
        this.inputFields.pSalt.value = parseFloat(this.sourdough.percentSalt * 100).toFixed(0);

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

