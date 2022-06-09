const cadexService = require('../cadex');
const { getRandomItem, getRandomIntInclusive } = require('../../helpers/random');

describe('getRandomIntInclusive function', () => {
    const randomInt = getRandomIntInclusive(0, 10);
    it('Should be return a integer between 0 and 10', () => {
        expect(randomInt).toBeGreaterThanOrEqual(0);
        expect(randomInt).toBeLessThanOrEqual(10);
    });
});

describe('getRandomItem function', () => {
    const mockArr = ['test', 'toto', 'foo'];
    const randomItem = getRandomItem(mockArr);
    it('Should be contained in array', () => {
        expect(mockArr.includes(randomItem)).toBe(true);
    });
});

// On peut générer notre cadex une seule fois, pour vérifier son retour plusieurs fois. Cela évite
// de surcharger en temp d'exécution notre fichier de test.
const cadex = cadexService.generate();

describe('Cadex generate method', () => {
    it('Should return a object', () => {
        expect(typeof cadex).toBe('object');
    });

    describe('Cadex properties', () => {
        describe('Cadex noun property', () => {
            it('Should exists', () => {
                expect(cadex.noun).toBeTruthy();
            });
            it('Should be a string', () => {
                expect(typeof cadex.noun).toBe('string');
            });
            it('Should be have a minimum length of 2', () => {
                expect(cadex.noun.length).toBeGreaterThanOrEqual(2);
            });
        });
        describe('Cadex adjective property', () => {
            it('Should exists', () => {
                expect(cadex.adjective).toBeTruthy();
            });
            it('Should be a string', () => {
                expect(typeof cadex.adjective).toBe('string');
            });
            it('Should be have a minimum length of 2', () => {
                expect(cadex.adjective.length).toBeGreaterThanOrEqual(2);
            });
        });
        describe('Cadex verb property', () => {
            it('Should exists', () => {
                expect(cadex.verb).toBeTruthy();
            });
            it('Should be a string', () => {
                expect(typeof cadex.verb).toBe('string');
            });
            it('Should be have a minimum length of 2', () => {
                expect(cadex.verb.length).toBeGreaterThanOrEqual(2);
            });
        });
        describe('Cadex complement property', () => {
            it('Should exists', () => {
                expect(cadex.complement).toBeTruthy();
            });
            it('Should be a string', () => {
                expect(typeof cadex.complement).toBe('string');
            });
            it('Should be have a minimum length of 2', () => {
                expect(cadex.complement.length).toBeGreaterThanOrEqual(2);
            });
        });
    });

    // it() et test() sont des alias, ils fonctionnent de la même façon
    it('Should return a string when it is cast as string', () => {
        expect(typeof `${cadex}`).toBe('string');
    });

    // Test qui n'est pas utlra fiable, mais qui donne une indication de minima, car rien que le nom
    // peut déjà contenir 3 espaces.
    test('Should have minimum 3 spaces', () => {
        // en argument de toMatch c'est une expression régulière, on verra cela plus tard. Ici cela
        // veut dire au moins 3 espaces dans la chaine de caractère.
        const arrCadex = `${cadex}`.split(' ');
        expect(arrCadex.length).toBeGreaterThanOrEqual(4);
    });

    // se te ma la
    test('Should have a minimum length of 11 caracters', () => {
        expect(`${cadex}`.length).toBeGreaterThanOrEqual(11);
    });
});
