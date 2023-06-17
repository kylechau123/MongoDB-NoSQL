const router = require("express").Router();

const { User } = require('../models');

// GET ALL
router.get("/", (req, res) => {
    User.find({})
    .populate("friends")
    .then(results => {
        res.json(results)
    })
})

// GET BY ID
router.get("/:id", (req, res) => {
    User.findOne(        {
        _id: req.params.id
    })
    .populate("friends")
    .then(results => {
        res.json(results)
    })
})

// CREATE ONE
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email
    })
    .then(results => {
        res.json(results)
    })
})

// UPDATE/EDIT BY ID
router.put("/:id", (req, res) => {
    User.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        }, 
        {
            new: true
        }
    )
    .then(results => {
        res.json(results)
    })
})

// DELETE BY ID
router.delete("/:id", (req, res) => {
    User.findOneAndDelete(
        {
            _id: req.params.id
        }
    )
    .then(results => {
        res.json(results)
    })
})

// ADDING A FRIEND
router.post("/:userId/friends/:friendId", (req, res) => {
    User.findOneAndUpdate(
        {
            _id: req.params.userId
        },
        {
            $push: {
                friends: req.params.friendId
            }
        }, 
        {
            new: true
        }
    )
    .then(results => {
        res.json(results)
    })
})

// DELETE A FRIEND
router.delete("/:userId/friends/:friendId", (req, res) => {
    User.findOneAndUpdate(
        {
            _id: req.params.userId
        },
        {
            $pull: {
                friends: req.params.friendId
            }
        }, 
        {
            new: true
        }
    )
    .then(results => {
        res.json(results)
    })
})


module.exports = router;