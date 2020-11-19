import VWG  from '../src/VWG'
test('can make a vwg object', ()=> {
    let vwg = new VWG();
    expect(vwg.targetPercentProtein).toBe(12.5);
    expect(vwg.flourPercentProtein).toBe(10);
    expect(vwg.vitalGlutenPercentProtein).toBe(76.6);
});

test('can compute protein given flour in grams', ()=> {
    let vwg = new VWG(12);
    expect(vwg.flourProteinGrams(400)).toBe(40);
})
test('can compute desired protein in grams', () => {
    let vwg = new VWG(12);
    expect(vwg.desiredProteinGrams(400)).toBe(48);
})
test('can compute difference in desired protein in grams', () => {
    let vwg = new VWG(12);
    expect(vwg.differenceProteinGrams(400)).toBe(8);
})
test('can compute needed flour in grams', () => {
    let vwg = new VWG();
    expect(vwg.flourGrams(400)).toBe(385);
})
test('can compute needed vwg in grams', () => {
    let vwg = new VWG();
    expect(vwg.vwgGrams(400)).toBe(15);
})