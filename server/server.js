const app=require("./App")





//config
   require("dotenv").config({
        path: 'Config/.env'
    });




// creating server

const server=app.listen(process.env.PORT,
    ()=>{
        console.log(`server is running on http://localhost:${process.env.PORT}`);
    });

