const express=require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const { authentication } = require("./middlewares/Authentication")
const PORT=process.env.PORT
const {userController}=require("./Routes/user.routes")
const {notesController}=require("./Routes/notes.routes")


const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home page of crud and assgn")
})

app.use("/user",userController)

app.use(authentication)

app.use("/notes",notesController)

app.listen(PORT,async ()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log("Error in db")
        console.log(err)
    }
    console.log(`listeninhg on ${PORT}`)
})