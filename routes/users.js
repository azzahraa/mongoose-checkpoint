const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Adding many users
router.post("/many", (req, res) =>{
    const info = req.body;

    User.create(info)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
        console.log(err.message);
        res.status(500).send("Server Blowing up, in 3.. 2...1 !")
    });
});
// add one user
router.post("/one", (req, res) => {
    const information = req.body;
    const newUser = new User(information);
    newUser
      .save()
      .then((user) => res.status(201).json(user))
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("Server Error");
      });
  });
//Get all users
router.get("/", async (req,res) =>{
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send("Server Dying from Errors")
    }
});

//Get on user by Adress
router.get("/user/:adress", (req,res) =>{
    User.find({ adress: req.params.adress})
    .then((users)=>{
        if(users.length) {
            res.status(200).send(users);
        }
        else{
            res.status(200).send({
                msg: "No user found with this Adress"
            });
        }
        
    })
    .catch((err) =>{
        console.log(err.message);
        res.status(500).send("Server Dead");
    });
});

//Get user by fname
router.get("/user/fname/:fname", (req,res)=>{
    User.findOne({fname: req.params.fname})
    .then((user) =>{
        if(user) {
            res.status(200).send(user);
        } else{
            res.status(200).send({ msg: "No user found with this first name, try again"})
        }
    })
    .catch((err)=> {
        console.log(err.message);
        res.status(500).send("server ERROR ");
    });
});

// get one user by ID
router.get("/userid/:id", (req,res) =>{
    User.findById(req.params.id, (err, user)=>{
        if (err){
            console.log(err.message);
            return res.status(500).send("server error");
        } else if (user){
            res.status(200).send(user);
        } else {
            res.json({msg: "user taken by aliens"});
        }
    });
});

// Delete user by ID
router.delete("/:id", (req, res) =>{
    User.findByIdAndRemove(req.params.id)
    .then(()=> res.send({ msg : "user deleted, search in area 54"}))
    .catch((err) => {
        console.log(err.message);
        res.status(500).send('warning, server error, deploying alien ships now')
    });
});

// delete user by fname
router.delete("/fname/:fname", (req, res) =>{
    User.deleteMany({ fname: req.params.fname})
    .then((users)=>
    res.send({ msg: "user deleted, organs donated to mother ship", count: users.deletedCount})
    )
    .catch((err) => {
        console.log(err.message);
        res.status(500).send(" sever error, rethink joining aliens")
    });
});

// edit user
router.put("/:id", (req,res) => {
    const information = req.body;
    User.findByIdAndUpdate(
        req.params.id,
        { $set: information},
        {new: true},
        (err, user) =>{
            if (err){
                console.log(err.message);
                return res.status(500).send("error in the server, bye bye")
            }
            res.send(user);
        }
    );
});

module.exports = router