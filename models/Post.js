const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    writer_id:{
        type : mongoose.Types.ObjectId,
        ref: "user",
    },
    title:{
        type: String,
        required: true,
        minlength: 5,
    },
    body: String,
    created_at:{
        type: Date,
        default: Date.now
    },
});

const postModel = mongoose.model("post", PostSchema);
module.exports = postModel;