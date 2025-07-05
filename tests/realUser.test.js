import mongoose from 'mongoose'
import request from 'supertest'
import app from '../index.js'
import dotenv from 'dotenv'
import User from '../models/User.js'
dotenv.config({ path: '.env.test' });
import { jest } from '@jest/globals';

jest.setTimeout(60000); // 60 seconds


/* 0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
If it’s already 0, no need to call dropDatabase() or close() */

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || "mongodb://localhost:27017/Test-testing")
})

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
});

afterEach(async () => {
    const { collections } = mongoose.connection;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

describe('POST /api/reg', () => {
    it('Should Register User', async () => {
        const userData = { name: "Alpha", email: "a@a.com" }
        const res = await request(app).post('/api/reg').send(userData)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('User registered successfully.')
        expect(res.body.success).toBe(true)

        const userInDB = await User.findOne({ email: userData.email })
        expect(userInDB.name).toBe(userData.name)
        expect(userInDB).not.toBeNull()
    })
}) 