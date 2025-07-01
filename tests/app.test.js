import request from "supertest"
import app from "../index.js"

describe('GET /api/hello', () => {
    it('Should return hello world message', async () => {
        const res = await request(app).get('/api/hello')
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message', 'Hello World !')
    })
})

// describe -> Group of related task
// it -> For single test case
// Request -> Help us to send http req. without browser or postman