'use strict'
import VWG from './VWG';

export default class Sourdough {
    useVitalWheatGluten = false;
    totalWeight = 0;
    percentLevain = .20;
    percentSalt = .02;
    percentMainFlour = 1;
    percentAddlFlour = 0;
    totalHydration = 0;
    vwg = new VWG();

    constructor(data = null) {
        if (data !== null) {
            this.totalWeight = data.totalWeight;
            this.totalHydration = data.totalHydration;
            this.useVitalWheatGluten = data.useVitalWheatGluten;
        }
    }

    setuUseVitalWheatGluten(value) {
        this.useVitalWheatGluten = value;
        if (this.useVitalWheatGluten === true) {
            this.percentMainFlour = this.vwg.percentFlour;
            this.percentAddlFlour = this.vwg.percentVWG;
        } else {
            this.percentMainFlour = 1;
            this.percentAddlFlour = 0;
        }

    }

    get levainPart() {
        return this.starter / 2;
    }

    get starter() {
        return parseInt(parseFloat(this.totalFlour * this.percentLevain).toFixed(0));
    }

    get totalWater() {

        return parseInt(parseFloat((this.totalHydration * this.totalWeight) / (1 + this.totalHydration)).toFixed(0));
    }

    get mainFlour() {
        if (this.totalFlour > 0) {
            return parseInt((this.totalFlour - this.levainPart) * this.percentMainFlour);
        }
        return 0;
    }

    get addlFlour() {
        if (this.totalFlour > 0) {
            return parseInt((this.totalFlour - this.levainPart) * this.percentAddlFlour);
        }
        return 0;
    }

    get water() {
        return parseInt(this.totalWater - this.levainPart);
    }

    get salt() {
        if (this.totalFlour > 0) {
            return parseInt(parseFloat(this.totalFlour * this.percentSalt).toFixed(0));
        }
        return 0;
    }

    get totalFlour() {
        if (this.totalWeight > 0) {
            return parseInt(parseFloat((this.totalWeight) / (1 + this.totalHydration)).toFixed(0));
        }
        return 0;
    }

    //
    // get totalWeight() {
    //     return this.totalFlour + this.totalWater + this.salt;
    // }
    //
    // get percentMainFlour() {
    //     if (this.totalFlour > 0)
    //         return this.mainFlour / this.totalFlour;
    //     return 0;
    // }
    //
    // get percentAddlFlour() {
    //     if (this.totalFlour > 0 && this.addlFlour > 0)
    //         return this.addlFlour / this.totalFlour;
    //     return 0;
    // }
    //
    get percentWater() {
        if (this.totalFlour > 0)
            return this.water / this.totalFlour;
        return 0;
    }

    //
    // get percentSalt() {
    //     if (this.totalFlour > 0)
    //         return this.salt / this.totalFlour;
    //     return 0;
    // }
    //
    get percentStarter() {
        return this.percentLevain;
        if (this.totalFlour > 0)
            return this.starter / this.totalFlour;
        return 0;
    }
}