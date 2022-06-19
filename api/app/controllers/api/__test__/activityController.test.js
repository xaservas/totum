const { mockRequest, mockResponse } = require('../../../services/interceptor');
const activityController = require('../activityController');

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

describe('test activity controller', () => {
    test('getAll', async () => {
        const req = mockRequest();
        const res = mockResponse();
        await activityController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    max_participants: expect.any(Number),
                    date: expect.any(String),
                    level: expect.any(Number),
                    address: expect.any(String),
                    zip_code: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    landmark: expect.any(String),
                    id_user: expect.any(Number),
                    id_category: expect.any(Number),
                    created_at: expect.any(Date),
                    updated_at: expect.toBeTypeOrNull(Date),
                }),
            ]),
        );
    });

    test('get by category 200', async () => {
        const req = mockRequest();
        req.params.category = 3;
        const res = mockResponse();
        await activityController.getByCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    max_participants: expect.any(Number),
                    date: expect.any(String),
                    level: expect.any(Number),
                    address: expect.any(String),
                    zip_code: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    landmark: expect.any(String),
                    id_user: expect.any(Number),
                    id_category: expect.any(Number),
                    created_at: expect.any(Date),
                    updated_at: expect.toBeTypeOrNull(Date),
                }),
            ]),
        );
    });

    test('get by category 404', async () => {
        const req = mockRequest();
        req.params.category = -1;
        const res = mockResponse();
        await activityController.getByCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('get by geo 200', async () => {
        const req = mockRequest();
        req.params.geo = 'landmark';
        const res = mockResponse();
        await activityController.getByGeo(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    max_participants: expect.any(Number),
                    date: expect.any(String),
                    level: expect.any(Number),
                    address: expect.any(String),
                    zip_code: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    landmark: expect.any(String),
                    id_user: expect.any(Number),
                    id_category: expect.any(Number),
                    created_at: expect.any(Date),
                    updated_at: expect.toBeTypeOrNull(Date),
                }),
            ]),
        );
    });

    test('get by geo 404', async () => {
        const req = mockRequest();
        req.params.category = -1;
        const res = mockResponse();
        await activityController.getByGeo(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('get by search 200', async () => {
        const req = mockRequest();
        req.params.search = 'velo';
        const res = mockResponse();
        await activityController.getBySearch(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    max_participants: expect.any(Number),
                    date: expect.any(String),
                    level: expect.any(Number),
                    address: expect.any(String),
                    zip_code: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    landmark: expect.any(String),
                    id_user: expect.any(Number),
                    id_category: expect.any(Number),
                    created_at: expect.any(Date),
                    updated_at: expect.toBeTypeOrNull(Date),
                }),
            ]),
        );
    });

    test('get by search 404', async () => {
        const req = mockRequest();
        req.params.category = -1;
        const res = mockResponse();
        await activityController.getBySearch(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('get by id 200', async () => {
        const req = mockRequest();
        req.params.id = 4;
        const res = mockResponse();
        await activityController.getOneActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                max_participants: expect.any(Number),
                date: expect.any(String),
                level: expect.any(Number),
                address: expect.any(String),
                zip_code: expect.any(String),
                city: expect.any(String),
                country: expect.any(String),
                landmark: expect.any(String),
                id_user: expect.any(Number),
                id_category: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('get by id 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();
        await activityController.getOneActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('create activity 200', async () => {
        const req = mockRequest();
        req.body = {
            name: 'test',
            description: 'test',
            max_participants: 10,
            date: '2020-01-01',
            level: 1,
            address: 'test',
            zip_code: 66600,
            city: 'test',
            country: 'test',
            landmark: 'test',
            id_user: 1,
            id_category: 3,
        };
        const res = mockResponse();
        await activityController.createActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                max_participants: expect.any(Number),
                date: expect.any(String),
                level: expect.any(Number),
                address: expect.any(String),
                zip_code: expect.any(String),
                city: expect.any(String),
                country: expect.any(String),
                landmark: expect.any(String),
                id_user: expect.any(Number),
                id_category: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('update activity 200', async () => {
        const req = mockRequest();
        req.params.id = 4;
        req.body = {
            name: 'test',
            description: 'test',
            max_participants: 10,
            date: '2020-01-01',
            level: 1,
            address: 'test',
            zip_code: 66600,
            city: 'test',
            country: 'test',
            landmark: 'test',
            id_user: 1,
            id_category: 3,
        };
        const res = mockResponse();
        await activityController.updateActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                max_participants: expect.any(Number),
                date: expect.any(String),
                level: expect.any(Number),
                address: expect.any(String),
                zip_code: expect.any(String),
                city: expect.any(String),
                country: expect.any(String),
                landmark: expect.any(String),
                id_user: expect.any(Number),
                id_category: expect.any(Number),
                created_at: expect.any(Date),
                updated_at: expect.toBeTypeOrNull(Date),
            }),
        );
    });

    test('update activity 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        req.body = {
            name: 'test',
            description: 'test',
            max_participants: 10,
            date: '2020-01-01',
            level: 1,
            address: 'test',
            zip_code: 66600,
            city: 'test',
            country: 'test',
            landmark: 'test',
            id_user: 1,
            id_category: 3,
        };
        const res = mockResponse();
        await activityController.updateActivity(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('get all user activities 200', async () => {
        const req = mockRequest();
        req.params.id = 5;
        const res = mockResponse();
        await activityController.getUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    activity_name: expect.any(String),
                    activity_description: expect.any(String),
                    activity_date: expect.any(String),
                    category_name: expect.any(String),
                    level_name: expect.any(String),
                    participant_id: expect.any(Number),
                    participant_email: expect.any(String),
                    participant_firstname: expect.any(String),
                    participant_lastname: expect.any(String),
                }),
            ]),
        );
    });

    test('get all user activities 404', async () => {
        const req = mockRequest();
        req.params.id = -1;
        const res = mockResponse();
        await activityController.getUser(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });
});
