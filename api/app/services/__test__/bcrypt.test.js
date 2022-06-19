const bcrypt = require('../bcrypt');

describe('Test bcrypt', () => {
    test('Check if password is hashed', async () => {
        const password = 'test';
        const hash = await bcrypt.hash(password);
        expect(hash).toBeDefined();
        expect(hash).toBeTruthy();
        expect(typeof hash).toBe('string');
    });

    test('Check if password is compared', async () => {
        const password = 'test';
        const hash = await bcrypt.hash(password);
        const result = await bcrypt.compare(password, hash);
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
    });
});
