import mongoose from 'mongoose'
import request from 'supertest'
import app from '../index.js'
import dotenv from 'dotenv'
import User from '../models/User.js'
dotenv.config()

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

afterEach(async () => {
    await User.deleteMany()
})

describe('POST /api/reg', () =>{
    it('Should Register User', async () => {
        const userData = {name: "Alpha", email: "a@a.com"}
        const res = await request(app).post('/api/reg').send(userData)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe('User registered successfully.')
        expect(res.body.success).toBe(true)

        const userInDB = await User.findOne({email: userData.email})
        expect(userInDB.name).toBe(userData.name)
        expect(userInDB).not.toBeNull()
    })
})