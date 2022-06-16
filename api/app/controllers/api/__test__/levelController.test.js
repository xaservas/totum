const { mockRequest, mockResponse } = require('../../../services/interceptor');
const levelController = require('../levelController');

expect.extend({
    toBeTypeOrNull(received) {
        const pass = expect(received);
        if (pass || received === null) {
            return {
                message: () => 'Ok',
                pass: true,
            };
        }
        return {
            message: () => 'Not ok',
            pass: false,
        };
    },
});

describe('Check CategoryController', () => {
    test('get all should return status 200 and value', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await levelController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
