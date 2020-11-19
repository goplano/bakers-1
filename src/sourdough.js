'use strict'
import VWG from './VWG';

export default class Sourdough {
    useVitalWheatGluten = false;
    percentProteinFlour = 10;
    percentProtienDesired = 12.5;
    mainFlour = 0;
    addlFlour = 0;
    water = 0;
    salt = 0;
    starter = 0;
    levainHydration = 1;
    vwg = new VWG();

    constructor(data = null) {
        if(data !== null) {
            this.mainFlour = +data.mainFlour;
            this.addlFour = +data.addlFlour;
            this.water = +data.water;
            this.salt = +data.salt;
            this.starter = +data.starter;
        }
    }
    setuUseVitalWheatGluten(value) {
        this.useVitalWheatGluten = value;
        if(this.useVitalWheatGluten === true) {
            const flourGrams = this.mainFlour;
            console.log(flourGrams);
            this.mainFlour = this.vwg.flourGrams(flourGrams);
            this.addlFlour = this.vwg.vwgGrams(flourGrams);
            console.log(this);
        }
        else {
            const flourGrams = this.mainFlour + this.addlFlour;
            this.mainFlour = flourGrams;
            this.addlFlour = 0;
        }

    }
    get levainFlour () {
        return (100 * this.starter) / (100 + (this.levainHydration * 100));
    }
    get levainWater () {
        return  ((this.levainHydration * 100) * this.starter) / (100 + (this.levainHydration * 100));
    }
    get levainPart() {
        return this.starter / 2;
    }

    get totalFlour() {
        return this.levainPart + this.mainFlour + this.addlFlour;
    }

    get totalWater() {
        return this.levainPart + this.water;
    }

    get totalHydration() {
        if (this.totalFlour > 0)
            return this.totalWater / this.totalFlour;
        return 0;
    }

    get totalWeight() {
        return this.totalFlour + this.totalWater + this.salt;
    }

    get percentMainFlour() {
        if (this.totalFlour > 0)
            return this.mainFlour / this.totalFlour;
        return 0;
    }

    get percentAddlFlour() {
        if (this.totalFlour > 0)
            return this.addlFlour / this.totalFlour;
        return 0;
    }

    get percentWater() {
        if (this.totalFlour > 0)
            return this.water / this.totalFlour;
        return 0;
    }

    get percentSalt() {
        if (this.totalFlour > 0)
            return this.salt / this.totalFlour;
        return 0;
    }

    get percentStarter() {
        if (this.totalFlour > 0)
            return this.starter / this.totalFlour;
        return 0;
    }

}