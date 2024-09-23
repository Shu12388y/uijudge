import { app } from "./server.js";
import { connectDatabase } from "./Database/Database.js";




connectDatabase().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is on ", process.env.PORT)
    })
}).catch((e)=>{
    console.log("error",e)
})

