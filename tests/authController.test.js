// ## when the user is not found in the database.


import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/User.js', () => ({
    default: {
        findOne: jest.fn()
    }
}));

test('Should return 404 when user not found', async () => {
    const { default: User } = await import('../models/User.js');
    const { login } = await import('../controllers/authController.js');

    const req = { body: { email: "test@test.com", name: "test" } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    // mock findOne to return null
    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
});
