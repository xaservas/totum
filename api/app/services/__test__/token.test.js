const tokenController = require('../token');
const userDataMapper = require('../../models/userDatamapper');

function generateToken() {
    const data = 'test@test.com';
    const token = tokenController.generateToken(data);
    return token;
}

describe('Check token controllers', () => {
    test('Check if token is generated with email', () => {
        const tokenLength = generateToken().length;
        expect(generateToken()).toBeDefined();
        expect(generateToken()).toBeTruthy();
        expect(tokenLength).toBeGreaterThan(100);
        expect(tokenLength).toBeLessThan(200);
        expect(generateToken()).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
    });

    test('Check if token is not blacklisted', async () => {
        const result = await tokenController.blacklistToken(generateToken());
        expect(result).toBeUndefined();
    });

    test('Check if token is blacklisted', async () => {
        const token = generateToken();
        await userDataMapper.logout(token);
        const result = await tokenController.blacklistToken(token);
        expect(result).toBeDefined();
        expect(result.token).toBe(token);
    });
});
