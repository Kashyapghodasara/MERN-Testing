import app from "./index.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const DBconnection = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB Connection Success ✅")
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("DB Connection Failed ❌", err)
})

