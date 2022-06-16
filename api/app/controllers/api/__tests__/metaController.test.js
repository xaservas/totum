const { mockRequest, mockResponse } = require('../../../services/interceptor');
const metaController = require('../metaController');

describe('Check metaController', () => {
    test('get meta by id with status 200', async () => {
        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();
        await metaController.getByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                cookie: expect.any(Boolean),
                landmark: expect.any(Boolean),
                id_user: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
            }),
        );
    });

    test('get meta by id with status 404', async () => {
        const req = mockRequest();
        req.params.id = 1000;
        const res = mockResponse();
        await metaController.getByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('update meta by id with status 200', async () => {
        const req = mockRequest();
        req.params.id = 1;
        req.body = {
            cookie: true,
            landmark: true,
        };
        const res = mockResponse();
        await metaController.updateByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                cookie: expect.any(Boolean),
                landmark: expect.any(Boolean),
                id_user: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
            }),
        );
    });

    test('update meta by id with status 404', async () => {
        const req = mockRequest();
        req.params.id = 1000;
        req.body = {
            cookie: true,
            landmark: true,
        };
        const res = mockResponse();
        await metaController.updateByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });
});
