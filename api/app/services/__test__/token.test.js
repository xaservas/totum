const { mockRequest, mockResponse } = require('../interceptor');
const tokenController = require('../token');

describe('Check token controllers', () => {
    test('Check if token is generated with email', () => {
        const data = 'test@test.com';

        expect(tokenController.generateToken(data)).toBeDefined();
        expect(tokenController.generateToken(data)).toBeTruthy();
    });
});
