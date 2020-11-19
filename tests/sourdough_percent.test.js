import Sourdough from '../src/sourdough_percents'

test('can make a sourdough object', () => {
    let sd = new Sourdough();
    expect(sd.totalWeight).toBe(0);
    expect(sd.percentLevain).toBe(.2);
    expect(sd.totalHydration).toBe(0);
})

test('it can set values on sourdough object', () => {
    let sd = new Sourdough();
    sd.totalWeight = 1000;
    sd.percentLevain = .1;
    sd.totalHydration = .6;
    expect(sd.totalWeight).toBe(1000);
    expect(sd.percentLevain).toBe(.1);
    expect(sd.totalHydration).toBe(.6);
})
test('it can compute total flour and total water', () => {
    let sd = new Sourdough();
    sd.totalWeight = 1025;
    sd.percentLevain = .25;
    sd.totalHydration = .69;
    expect(sd.totalWater).toBe(418);
    expect(sd.totalFlour).toBe(607);
})
test('it can compute levain part sourdough object', () => {
    let sd = new Sourdough();
    sd.totalWeight = 1025;
    sd.percentLevain = .25;
    sd.totalHydration = .69;
    expect(sd.levainPart).toBe(76);
})
test('it can compute starter', () => {
    let sd = new Sourdough();
    sd.totalWeight = 1025;
    sd.percentLevain = .25;
    sd.totalHydration = .69;
    expect(sd.starter).toBe(152);
})
test('it can compute added flour and water and salt ', () => {
    let sd = new Sourdough();
    sd.totalWeight = 1025;
    sd.percentLevain = .25;
    sd.totalHydration = .69;

    expect(sd.salt).toBe(12);
    expect(sd.mainFlour).toBe(531)
    expect(sd.water).toBe(342)
})
test('it will not choke if values are not set', () => {
    let sd = new Sourdough();

    expect(sd.totalFlour).toBe(0);
    expect(sd.totalWater).toBe(0);
    expect(sd.totalWeight).toBe(0);
    expect(sd.totalHydration).toBe(0);
    expect(sd.percentMainFlour).toBe(1);
    expect(sd.percentWater).toBe(0);
    expect(sd.percentAddlFlour).toBe(0);
    expect(sd.percentSalt).toBe(.02);
    expect(sd.percentLevain).toBe(.2);
    expect(sd.percentStarter).toBe(.2);
    expect(sd.totalHydration).toBe(0);
})
