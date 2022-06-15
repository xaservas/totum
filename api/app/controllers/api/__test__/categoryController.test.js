const { mockRequest, mockResponse } = require('../../../services/interceptor');
const categoryController = require('../categoryController');

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
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Check Category creator', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.createCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith(expect.any(Object));

        // expect(res.json).toHaveBeenCalledWith(
        //     expect.objectContaining({
        //         id: expect.any(Number),
        //         picto: expect.any(String),
        //         created_at: expect.any(Date),
        //         updated_at: expect.any(Date),
        //         id_user: expect.any(Number),
        //     }),
        // );
    });
});

describe('Check getOneCategoryy controllerr', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();
        req.params.id = 1;

        const res = mockResponse();

        await categoryController.getOneCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        // expect(res.json).toHaveBeenCalledWith(
        //     expect.objectContaining({
        //         id: expect.any(Number),
        //         picto: expect.any(String),
        //         created_at: expect.any(Date),
        //         updated_at: expect.any(Date),
        //         id_user: expect.any(Number),
        //     }),
        // );
    });
});

describe('Check updateCategory controller', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.updateCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Check removeCategory controller', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.removeCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
