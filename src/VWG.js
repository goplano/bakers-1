export default class VWG {
    constructor(targetProtein = 12.5, currentProtein = 10) {
        this.targetPercentProtein = targetProtein;
        this.flourPercentProtein = currentProtein;
        this.vitalGlutenPercentProtein = 76.6;
    }
    flourProteinGrams(flourInGrams) {
        return this.flourPercentProtein * flourInGrams / 100;
    }
    desiredProteinGrams(flourInGrams) {
        return this.targetPercentProtein * flourInGrams / 100;
    }
    differenceProteinGrams(flourInGrams) {
        return this.desiredProteinGrams(flourInGrams) - this.flourProteinGrams(flourInGrams);
    }
    addedVWG(flourInGrams) {
        const needProteinGrams = this.differenceProteinGrams(400);
        return this.totalGramsFromProtein(this.vitalGlutenPercentProtein, needProteinGrams);
    }
    totalGramsFromProtein(percentProtein, neededGrams) {
        return Math.round(neededGrams / percentProtein * 100);
    }
    get partsVWG() {
        return this.targetPercentProtein - this.flourPercentProtein;
    }
    get partsFlour() {
        return this.vitalGlutenPercentProtein - this.targetPercentProtein;
    }
    get totalParts() {
        return this.partsVWG + this.partsFlour;
    }
    get percentFlour() {
        return this.partsFlour / this.totalParts;
    }
    get percentVWG() {
        return this.partsVWG / this.totalParts;
    }
    flourGrams(totalWeight) {
        return Math.round(this.percentFlour * totalWeight)
    }
    vwgGrams(totalWeight) {
        return Math.round(this.percentVWG * totalWeight)
    }
    doit () {

    // targetPercentProtein = (flourPercentProtein * x) + (vitalGlutenPercentProtein * y)
    // (100 - targetPercentProtein) = ((100 - flourPercentProtein) * x) +
    //     ((100 - vitalGlutenPercentProtein) * y)
    }

}