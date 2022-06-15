const { mockRequest, mockResponse } = require('../../../services/interceptor');
const categoryController = require('../categoryController');

describe('Check CategoryController', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Check Category creatorr', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.createCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
