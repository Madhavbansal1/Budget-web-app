import connectdb from "./db/index.js";
import app from "./app.js";


connectdb()
.then(()=>{
    const port  = process.env.PORT || 8080;
    app.listen(port, ()=>{
        console.log(`🥳🥳 Listening on port ${port} 🥳🥳`)
    })
})
.catch((error)=>{
    console.log(error);
})
