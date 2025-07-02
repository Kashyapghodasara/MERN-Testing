import express from "express"
import dotenv from "dotenv"
import User from './models/User.js'
const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: "Hello World !" })
})

app.post('/api/reg', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) return res.status(400).json({ message: "All fields are required." })

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists." })

        const newUser = await User.create({ name, email })
        await newUser.save()
        return res.status(200).json({
            message: "User registered successfully.",
            success: true,
            name,
            email
        })

    } catch (error) {
        res.status(400).json({
            message: "Something Wrong in Reg.",
            errorMessage: error.message,
            success: false
        })
    }
})


export default app