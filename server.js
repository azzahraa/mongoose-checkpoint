
const express = require('express');
const ConnectDB = require("./ConnectDB");

const app = express();
//Middleware
app.use(express.json());

//Connect Database
ConnectDB();

//Routes
app.use("/user", require("./routes/users"));
app.use("/post", require("./routes/posts"))

//Port
const PORT = 5000;
app.listen(PORT, (err)=>{
    if (err) throw err;
    console.log(`Server OK on ${PORT}`);
});