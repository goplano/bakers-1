import Sourdough  from '../src/sourdough'
test('can make a sourdough object', ()=> {
    let sd = new Sourdough();
    expect(sd.mainFlour).toBe(0);
    expect(sd.addlFlour).toBe(0);
    expect(sd.water).toBe(0);
    expect(sd.starter).toBe(0);
    expect(sd.salt).toBe(0);
})

test('it can set values on sourdough object', ()=> {
    let sd = new Sourdough();
    sd.mainFlour = 500;
    sd.addlFlour = 50;
    sd.water = 350;
    sd.starter = 150;
    sd.salt = 10;
    expect(sd.mainFlour).toBe(500);
    expect(sd.addlFlour).toBe(50);
    expect(sd.water).toBe(350);
    expect(sd.starter).toBe(150);
    expect(sd.salt).toBe(10);
})

test('it can compute levain part sourdough object', ()=> {
    let sd = new Sourdough();
    expect(sd.mainFlour).toBe(0);
    sd.starter = 500;
    expect(sd.levainHydration).toBe(1);
    expect(sd.levainFlour).toBe(250);
    expect(sd.levainWater).toBe(250);
    sd.levainHydration = .6;
    sd.starter = 100;
    expect(sd.starter).toBe(100);
    expect(sd.levainFlour).toBe(62.5);
    expect(sd.levainWater).toBe(37.5);
})
test('it can compute total flour, total water, total weight', ()=> {
    let sd = new Sourdough();
    sd.mainFlour = 500;
    sd.addlFlour = 50;
    sd.water = 350;
    sd.starter = 150;
    sd.salt = 10;
    expect(sd.totalFlour).toBe(625);
    expect(sd.totalWater).toBe(425);
    expect(sd.totalWeight).toBe(1060);
    expect(sd.totalHydration).toBe(.68);
})
test('it will not choke if values are not set', ()=> {
    let sd = new Sourdough();

    expect(sd.totalFlour).toBe(0);
    expect(sd.totalWater).toBe(0);
    expect(sd.totalWeight).toBe(0);
    expect(sd.totalHydration).toBe(0);
    expect(sd.percentMainFlour).toBe(0);
    expect(sd.percentWater).toBe(0);
    expect(sd.percentAddlFlour).toBe(0);
    expect(sd.percentSalt).toBe(0);
    expect(sd.percentStarter).toBe(0);
    expect(sd.totalHydration).toBe(0);
})
test('it can compute percent flour, total water, total weight', ()=> {
    let sd = new Sourdough();
    sd.mainFlour = 500;
    sd.addlFlour = 50;
    sd.water = 350;
    sd.starter = 150;
    sd.salt = 10;
    expect(sd.percentMainFlour).toBe(.80);
    expect(sd.percentWater).toBe(.56);
    expect(sd.percentAddlFlour).toBe(.08);
    expect(sd.percentSalt).toBe(.016);
    expect(sd.percentStarter).toBe(.24);
    expect(sd.totalHydration).toBe(.68);
})