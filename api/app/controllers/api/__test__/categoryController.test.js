const {
    uniqueNamesGenerator, adjectives, colors, animals,
} = require('unique-names-generator');
const { mockRequest, mockResponse } = require('../../../services/interceptor');
const categoryController = require('../categoryController');

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

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

        await categoryController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('test getOneCategory with status 200', async () => {
        const req = mockRequest();
        req.params.id = 10;
        const res = mockResponse();

        await categoryController.getOneCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                picto: expect.toBeTypeOrNull(String),
                id_user: expect.toBeTypeOrNull(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('test getOneCategory with status 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();

        await categoryController.getOneCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('updateCategory with status 200', async () => {
        const req = mockRequest();
        req.params.id = 3;
        req.body = {
            name: randomName,
            picto: 'test',
        };
        const res = mockResponse();

        await categoryController.updateCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                picto: expect.toBeTypeOrNull(String),
                id_user: expect.toBeTypeOrNull(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });
});
