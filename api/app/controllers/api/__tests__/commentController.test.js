const { mockRequest, mockResponse } = require('../../../services/interceptor');
const commentController = require('../commentController');

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

describe('test comment controller', () => {
    test('should get by user 200', async () => {
        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();
        await commentController.getByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    comment_id: expect.any(Number),
                    comment_content: expect.any(String),
                    comment_date: expect.any(Date),
                    id_user: expect.any(Number),
                    user_email: expect.any(String),
                    user_firstname: expect.any(String),
                    user_lastname: expect.any(String),
                    activity_id: expect.any(Number),
                    activity_name: expect.any(String),
                }),
            ]),
        );
    });

    test('should get by user 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();
        await commentController.getByUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('should get by activity 200', async () => {
        const req = mockRequest();
        req.params.id = 4;
        const res = mockResponse();
        await commentController.getByActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    comment_id: expect.any(Number),
                    comment_content: expect.any(String),
                    comment_date: expect.any(Date),
                    id_user: expect.any(Number),
                    user_email: expect.any(String),
                    user_firstname: expect.any(String),
                    user_lastname: expect.any(String),
                    activity_id: expect.any(Number),
                    activity_name: expect.any(String),
                }),
            ]),
        );
    });

    test('should get by activity 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();
        await commentController.getByActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('should create comment 200', async () => {
        const req = mockRequest();
        req.body = {
            content: "I'm a comment",
            picture: '',
            id_user: 1,
            id_activity: 4,
        };
        const res = mockResponse();
        await commentController.createComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                content: expect.any(String),
                picture: expect.toBeTypeOrNull(String),
                id_user: expect.any(Number),
                id_activity: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('should be get one comment 200', async () => {
        const req = mockRequest();
        req.params.id = 3;
        const res = mockResponse();
        await commentController.getOneComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                content: expect.any(String),
                picture: expect.toBeTypeOrNull(String),
                id_user: expect.any(Number),
                id_activity: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('should be get one comment 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();
        await commentController.getOneComment(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('should be update comment 200', async () => {
        const req = mockRequest();
        req.params.id = 3;
        req.body = {
            content: "I'm a comment",
            picture: '',
            id_user: 1,
            id_activity: 4,
        };
        const res = mockResponse();
        await commentController.updateComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                content: expect.any(String),
                picture: expect.toBeTypeOrNull(String),
                id_user: expect.any(Number),
                id_activity: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('should be update comment 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        req.body = {
            content: "I'm a comment",
            picture: '',
            id_user: 1,
            id_activity: 4,
        };
        const res = mockResponse();
        await commentController.updateComment(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });
});
