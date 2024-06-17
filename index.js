const express = require('express');
const app = express();
const port = 8080;
const {v4 : uuidv4} = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require('path');
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {
        id :uuidv4(),
        username : "Apnacollege",
        content : "I love coding",

    },
    {
        id : uuidv4(),
        username : "RajatUpadhyay",
        content : "Hard work is important to achieve success",

    },
    {
        id : uuidv4(),
        username : "Rahulkumar",
        content : "I got my first internship in Amozon",

    },
]

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
})
app.post("/posts",(req,res) => {
    //console.log(req.body);
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    //res.send("Post method working");
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    //console.log(id);
    let post = posts.find((p) => id === p.id);
    console.log(post);
    //res.send("Id working");
    res.render("show.ejs",{post});
})

app.patch('/posts/:id',(req,res)=>{
    let { id }  = req.params;
    //console.log(id);
    let newContent = req.body.content;
    //console.log(newContent);
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    //res.redirect("/posts");
    res.send("Patch request working");
  
})

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{ post });
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p) => id !== p.id);
    //res.send("delete success");
    res.redirect("/posts");
})

app.listen(port,function(){
    console.log(`Port is listening ${port}`);
});