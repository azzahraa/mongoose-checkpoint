const mongoose = require('mongoose');

const database_url = process.env.MONGO_URI ; 

const ConnectDB = () => {
    mongoose.connect(
        database_url, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        },
        (err) =>{
            if(err){
                throw err;
            }
            console.log("Database Connected")
        }
    );
};
module.exports = ConnectDB;