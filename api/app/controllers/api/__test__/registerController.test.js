const { mockRequest, mockResponse } = require('../../../services/interceptor');
const registerController = require('../registerController');

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

describe('test register controller', () => {
    test('should get one register', async () => {
        const req = mockRequest();
        req.params.id = 2;
        const res = mockResponse();
        await registerController.getOneRegister(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id_user: expect.any(Number),
                id_activity: expect.any(Number),
                activity_name: expect.any(String),
                activity_description: expect.any(String),
                activity_date: expect.any(String),
                category_name: expect.any(String),
                user_firstname: expect.any(String),
                user_lastname: expect.any(String),
                user_email: expect.any(String),
            }),
        );
    });

    test('should get one register 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();
        await registerController.getOneRegister(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });
});
