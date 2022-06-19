const { mockRequest, mockResponse } = require('../../../services/interceptor');
const levelController = require('../levelController');

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

    await levelController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          created_at: expect.any(Date),
          updated_at: expect.toBeTypeOrNull(Date),
        }),
      ])
    );
  });

  test('get by id should return status 200 and value', async () => {
    const req = mockRequest();
    req.params.id = 1;
    const res = mockResponse();

    await levelController.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.toBeTypeOrNull(Date),
      })
    );
  });

  test('get by id should return status 404 and error', async () => {
    const req = mockRequest();
    req.params.id = -1;
    const res = mockResponse();

    await levelController.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No level found' });
  });
});
