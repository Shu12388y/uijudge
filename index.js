import { app } from "./server.js";




app.listen(process.env.PORT,()=>{
    console.log("server is on ", process.env.PORT)
})