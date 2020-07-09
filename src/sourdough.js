'use strict'

export default class Sourdough {
    mainFlour = 0;
    addlFlour = 0;
    water = 0;
    salt = 0;
    starter = 0;

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