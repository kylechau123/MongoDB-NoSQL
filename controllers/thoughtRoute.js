const router = require('express').Router();

const { Thought } = require('../models');

// GET ALL
router.get("/", (req, res) => {
    Thought.find({})
    .then(results => {
        res.json(results)
    })
})

// GET BY ID
router.get("/:id", (req, res) => {
    Thought.findByPk(req.params.id)
    .then(results => {
        res.json(results)
    })
})

// CREATE THOUGHT
router.post("/", (req, res) => {
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    })
    .then(results => {
        res.json(results)
    })
})

// UPDATE/EDIT BY ID
router.put("/:id", (req, res) => {
    Thought.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $set: {
                thoughtText: req.body.thoughtText
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
    Thought.findOneAndDelete(
        {
            _id: req.params.id
        }
    )
    .then(results => {
        res.json(results)
    })
})

// ADDING A REACTION
router.post("/:thoughtId/reaction", (req, res) => {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId
        },
        {
            $push: {
                reactions: {
                    reactionBody: req.body.reactionBody,
                    username: req.body.username
                }
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

// DELETING A REACTION
router.delete("/:thoughtId/reaction/:reactionId", (req, res) => {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId
        },
        {
            $pull: {
                reactions: {
                    reactiondId: req.params.reactionId
                }
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