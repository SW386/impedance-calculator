const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/CalculatorComments',
{useNewUrlParser:true,useUnifiedTopology: true});

var commentSchema = new mongoose.Schema({
    name: String,
    text: String,
    created: {type: Date, default:Date.now}
}); 
var Comment = mongoose.model("Comment",commentSchema);


router.post("/comment", function(req,res) {
    try {

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
