var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));



app.get("/api/users", function(req, res){
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});

app.get("/api/photos", function (req, res) {
    var content = fs.readFileSync("photos.json", "utf8");
    var photos = JSON.parse(content);
    res.send(photos);
});

app.get("/api/users/:id", function(req, res){
    var id = req.params.id;
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.get("/api/photos/:tag", function(req, res){
    var tag = req.params.tag;
    var content = fs.readFileSync("photos.json", "utf8");
    var photos = JSON.parse(content);
    var photo = null;
    var photoList = []
    for(var i=0; i<photos.length; i++){
        if(photos[i].tag==tag){
            photo = photos[i];
            photoList.push(photo);
        }
    }
    if(photo){
        res.send(photoList);
    }
    else{
        res.status(404).send();
    }
});

app.post("/api/login", function(req, res){
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    var user = null;
    for(var i=0; i<users.length; i++){
        if(users[i].email==userEmail){
            user = users[i];
        }
    }
    if(user){
        if(user.password == userPassword){
            res.send(photoList);
        }else{
            res.status(400).send();
        }
    }
    else{
        res.status(404).send();
    }
});

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    var user = {email: userEmail, password: userPassword};

    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);

    var id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    user.id = id+1;
    users.push(user);
    var data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
});

app.post("/api/photos", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var photoURL = req.body.URL;
    var photoTag = req.body.tag;
    var photo = {URL: photoURL, tag: photoTag};

    var data = fs.readFileSync("photos.json", "utf8");
    var photos = JSON.parse(data);

    var id = Math.max.apply(Math,photos.map(function(o){return o.id;}))
    photo.id = id+1;
    photos.push(photo);
    var data = JSON.stringify(photos);
    fs.writeFileSync("photos.json", data);
    res.send(photo);
});

app.delete("/api/users/:id", function(req, res){

    var id = req.params.id;
    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    var userId = req.body.id;
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    var data = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    if(user){
        user.email = userEmail;
        user.password = userPassword;
        var data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

app.listen(3000, function(){
    console.log("Server working...");
});

module.exports = app;