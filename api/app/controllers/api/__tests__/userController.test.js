const { mockRequest, mockResponse } = require('../../../services/interceptor');
const userController = require('../userController');

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

describe('Check userController', () => {
    test('getAll', async () => {
        const req = mockRequest();
        const res = mockResponse();
        await userController.getAll(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    firstname: expect.any(String),
                    lastname: expect.any(String),
                    picture: expect.any(String),
                    about: expect.any(String),
                    address: expect.any(String),
                    zip_code: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                    meta_id: expect.any(Number),
                }),
            ]),
        );
    });

    // test get user by id
    test('Get user should 200 and return correct values', async () => {
        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();
        await userController.getOneUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(Number),
                email: expect.any(String),
                firstname: expect.any(String),
                lastname: expect.any(String),
                picture: expect.toBeTypeOrNull(String),
                about: expect.toBeTypeOrNull(String),
                address: expect.any(String),
                zip_code: expect.any(String),
                city: expect.any(String),
                country: expect.any(String),
                created_at: expect.any(Date),
                updated_at: expect.any(Date),
                meta_id: expect.any(Number),
            }),
        );
    });

    test('Get user should 404 and return no values', async () => {
        const req = mockRequest();
        req.params.id = 1000;
        const res = mockResponse();
        await userController.getOneUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    // test update user
    test('Update user should 200 and return correct values', async () => {
        const req = mockRequest();
        req.params.id = 1;
        req.body = {
            firstname: 'John',
            lastname: 'Doe',
            picture: 'https://example.com/picture.jpg',
            about: 'About',
            address: 'Address',
            zip_code: 66000,
            city: 'City',
            country: 'Country',
            cookie: true,
            landmark: true,
        };
        const res = mockResponse();
        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    firstname: expect.any(String),
                    lastname: expect.any(String),
                    picture: expect.any(String),
                    about: expect.any(String),
                    address: expect.any(String),
                    zip_code: expect.any(String),
                    city: expect.any(String),
                    country: expect.any(String),
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                    meta_id: expect.any(Number),
                }),
                expect.objectContaining({
                    id: expect.any(Number),
                    cookie: expect.any(Boolean),
                    landmark: expect.any(Boolean),
                    updated_at: expect.any(Date),
                }),
            ]),
        );
    });

    test('Update user should 404 and return no values', async () => {
        const req = mockRequest();
        req.params.id = 1000;
        req.body = {
            firstname: 'John',
            lastname: 'Doe',
            picture: 'https://example.com/picture.jpg',
            about: 'About',
            address: 'Address',
            zip_code: 66000,
            city: 'City',
            country: 'Country',
            cookie: true,
            landmark: true,
        };
        const res = mockResponse();
        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    // test login
    test('login should 200 and return correct values', async () => {
        const req = mockRequest();
        req.body = {
            email: 'test@test.com',
            password: 'hash',
        };
        const res = mockResponse();
        await userController.login(req, res);

        // const response = {
        //     token: expect.any(String),
        //     user: {
        //         id: expect.any(Number),
        //         email: expect.any(String),
        //         firstname: expect.any(String),
        //         lastname: expect.any(String),
        //         picture: expect.toBeTypeOrNull(String),
        //         about: expect.toBeTypeOrNull(String),
        //         address: expect.any(String),
        //         zip_code: expect.any(String),
        //         city: expect.any(String),
        //         country: expect.any(String),
        //         created_at: expect.any(Date),
        //         updated_at: expect.any(Date),
        //         meta_id: expect.any(Number),
        //     },
        // };

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    // test update password
    test('updatePassword should 200 and return correct values', async () => {
        const req = mockRequest();
        req.body = {
            password: 'hash',
            passwordConfirmation: 'hash',
        };
        req.params.id = 1;
        const res = mockResponse();
        await userController.updatePassword(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('updatePassword with bad id should 401 and return no values', async () => {
        const req = mockRequest();
        req.body = {
            password: 'hash',
            passwordConfirmation: 'hash',
        };
        req.params.id = 1000;
        const res = mockResponse();
        await userController.updatePassword(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('updatePassword with bad match should 401 and return no values', async () => {
        const req = mockRequest();
        req.body = {
            password: 'hash',
            passwordConfirmation: 'test',
        };
        req.params.id = 1;
        const res = mockResponse();
        await userController.updatePassword(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    // test update email
    test('updateEmail should 200 and return correct values', async () => {
        const req = mockRequest();
        req.body = {
            email: 'test@test.com',
            emailNew: 'test@test.com',
            emailConfirmation: 'test@test.com',
        };
        req.params.id = 1;
        const res = mockResponse();
        await userController.updateEmail(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('updateEmail with bad id should 401 and return no values', async () => {
        const req = mockRequest();
        req.body = {
            email: 'test@test.fr',
            emailNew: 'test@test.fr',
            emailConfirmation: 'test@test.fr',
        };
        req.params.id = 1000;
        const res = mockResponse();
        await userController.updateEmail(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    test('updateEmail with bad match should 401 and return no values', async () => {
        const req = mockRequest();
        req.body = {
            email: 'test@test.fr',
            emailNew: 'test@test.fr',
            emailConfirmation: 'hash@test.fr',
        };
        req.params.id = 1;
        const res = mockResponse();
        await userController.updateEmail(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });

    // test get all activities of user
    test('getAllActivities should 200 and return correct values', async () => {
        const req = mockRequest();
        req.params.id = 1;
        const res = mockResponse();
        await userController.getActivity(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    user_id: expect.any(Number),
                    user_email: expect.any(String),
                    user_firstname: expect.any(String),
                    user_lastname: expect.any(String),
                    activity_name: expect.any(String),
                    activity_description: expect.any(String),
                    activity_date: expect.any(String),
                    category_name: expect.any(String),
                    level_name: expect.any(String),
                }),
            ]),
        );
    });

    test('getAllActivities with bad id should 404 and return no values', async () => {
        const req = mockRequest();
        req.params.id = 1000;
        const res = mockResponse();
        await userController.getActivity(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
            }),
        );
    });
});
