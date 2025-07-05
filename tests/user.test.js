import mongoose from "mongoose"
import request from "supertest"
import app from "../index.js"
import User from "../models/User.js"
import { MongoMemoryServer } from "mongodb-memory-server"

let mongoServer;

// Create DB Server            // Drop DB
// Get URI                     // Close Connection
// Connect with URI            // Stop Server

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();   // It will Return a URI
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {                   // ✅ Connect mongoose to this in-memory DB
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()     // Drop DB
    await mongoose.connection.close()           // Close connection with DB
    await mongoServer.stop()                    // Stop Server
})

afterEach(async () => {
    await User.deleteMany()   // Clear all user data (So each test starts fresh)
    jest.clearAllMocks()
})

// ## Positive testing

describe('POST /api/reg', () => {
    it('Should register user', async () => {
        const newUser = { name: "Bob", email: "b@b.com" }
        const res = await request(app).post('/api/reg').send(newUser)

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User registered successfully.");
        expect(res.body.success).toBe(true);
        expect(res.body.name).toBe(newUser.name);
        expect(res.body.email).toBe(newUser.email); 

        // Those expected Value also available in oringinal Response like "name" and "email"
    })
})

// ## Negative testing
describe('POST /api/reg',  () => {
    it('Should Return 400 Status Code with Error Message', async () => {
        const data = {email: "k@k.com"}
        const res = await request(app).post('/api/reg').send(data)

        expect(res.body).toHaveProperty('message', 'All fields are required.')
        expect(res.statusCode).toBe(400)
    })
})

// ## Invalid Route Testing
describe('GET /api/api', () => {
    it('Should Return 404 Status Code with Error Message', async() => {
        const res = await request(app).get('/api/api')
        expect(res.statusCode).toBe(404)
    })
})
