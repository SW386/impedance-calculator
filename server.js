const express = require("express");
const bodyParser = require("body-parser");
const mathRoutes = require("./routes/api/calc");
const commentRoutes = require("./routes/api/comment");


const app = express();
app.use(bodyParser.json());
app.use(mathRoutes);
app.use(commentRoutes);


app.listen(5000, function() {
    console.log("success");
})
