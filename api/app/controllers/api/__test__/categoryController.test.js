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

describe('Check Category creator', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.createCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('Check getOneCategoryy controllerr', () => {
    test('should 200 and return correct values', async () => {
        const req = mockRequest();

        const res = mockResponse();

        await categoryController.getOneCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
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
