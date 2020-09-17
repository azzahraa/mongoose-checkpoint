const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fname : String,
    lname : String,
    age : Number,
    adress: Array,
    created_at : {
        type : Date,
        default : Date.now,
    },
});

const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;