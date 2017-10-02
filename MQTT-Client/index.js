var express = require("express");
var app = express();

app.use(express.static("public")); //dan request user ve thu muc public
app.use(express.static("node_modules"));

app.set("view engine","ejs");
app.set("views","./views");
var server = require("http").createServer(app);

server.listen(8000);

app.get("/",function(req,res){
    res.render("trangchu");
});