const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/CalculatorComments',
{useNewUrlParser:true,useUnifiedTopology: true});

var commentSchema = new mongoose.Schema({
    name: String,
    text: String,
    time: {type: Date, default:Date.now}
}); 
var Comment = mongoose.model("Comment",commentSchema);

router.post("/comment", function(req,res) {
    try {
        if(req.body.name !== null && req.body.text !== null) {
            const newComment = {
                name: req.body.name,
                text: req.body.text
            }
            Comment.create(newComment);
            res.status(200).json({msg:"successfully commented"});
        } else {
            throw Error("Empty name or text");
        }
    } catch(e) {
        res.status(400).json({msg:e.message});
    }
})


router.get("/comments", function(req,res) {
    try {
        Comment.find({}, function(err,comments) {
            res.send({comments:comments})
        });
    } catch (e) {
        res.status(400).json({msg:e.message});
    }
})

module.exports = router;
