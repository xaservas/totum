// const { mockRequest, mockResponse } = require('../../../services/interceptor');
// const activityController = require('../activityController');

// expect.extend({
//     toBeTypeOrNull(received) {
//         const pass = expect(received);
//         if (pass || received === null) {
//             return {
//                 message: () => 'Ok',
//                 pass: true,
//             };
//         }
//         return {
//             message: () => 'Not ok',
//             pass: false,
//         };
//     },
// });

// describe('Check ActivityController getAll', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();

//         const res = mockResponse();

//         await activityController.getAll(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });

// describe('Check ActivityController getByGeo', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();
//         // req.params.id = 1;

//         const res = mockResponse();

//         await activityController.getByGeo(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });

// describe('Check ActivityController getByCategory', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();

//         const res = mockResponse();

//         await activityController.getByCategory(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });

// describe('Check ActivityController getBySearch', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();

//         const res = mockResponse();

//         await activityController.getBySearch(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });

// describe('Check Activity creator', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();

//         const res = mockResponse();

//         await activityController.createActivity(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });

// describe('Check getOneActivity controller', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();
//         req.params.id = 1;

//         const res = mockResponse();

//         await activityController.getOneActivity(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith(expect.any(Object));
//     });
// });

// describe('Check updateActivity controller', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();

//         const res = mockResponse();

//         await activityController.updateActivity(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });

// describe('Check removeActivity controller', () => {
//     test('should 200 and return correct values', async () => {
//         const req = mockRequest();

//         const res = mockResponse();

//         await activityController.removeActivity(req, res);
//         expect(res.status).toHaveBeenCalledWith(200);
//     });
// });
