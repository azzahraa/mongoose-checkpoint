const express = require('express');
const router = express.Router();
const Post = require("../models/Post");

router.post("/:writerId", (req, res) =>{
    const info = req.body;
    let newPost = new Post({...info, writer_id: req.params.writer_id});
    newPost.save()
    .then((post)=> res.send(post))
    .catch((err)=>{
        res.send({msg : err.message});
        console.error(err.message);
    });
});

//Get User's Post
router.get("/user/:id", (req,res)=>{
    Post.find({ writer_id: req.params.id })
    .then((posts)=> res.send(posts))
    .catch((err) => {
        res.send({ msg: err.message});
        console.error(err.message);
    });
});

module.exports = router;