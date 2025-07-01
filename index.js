import express from "express"
import dotenv from "dotenv"
const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/hello', (req, res) => {
    res.status(200).json({message: "Hello World !"})
})


export default app