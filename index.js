const express=require("express");
const app=express();
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

const port=3000;


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//****DATA
let data=[
    {
        id:uuidv4(),
        username:"thedogist",
        imgUrl:"https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600",
        Likes:843,
        Comments:858
    },
    {
        id:uuidv4(),
        username:"keepingfinn",
        imgUrl:"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
        Likes:783,
        Comments:126
    },
    {
        id:uuidv4(),
        username:"wethedogsnyc",
        imgUrl:"https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=600",
        Likes:295,
        Comments:961
    },
    {
        id:uuidv4(),
        username:"k9.lulu",
        imgUrl:"https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600",
        Likes:460,
        Comments:43
    },
    {
        id:uuidv4(),
        username:"thatdoodsquad",
        imgUrl:"https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=600",
        Likes:739,
        Comments:163
    }
];

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Listening to ${port}`);
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{data});
});

app.get("/posts/new",(req,res)=>{
    res.render("addpost.ejs");
});

app.post("/posts",(req,res)=>{
    const id=uuidv4();
    const {username,url:imgUrl,likes:Likes,comment:Comments}=req.body;
    data.push({id,username,imgUrl,Likes,Comments});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const post=data.find((p)=> p.id===id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    const {id}=req.params;
    const post=data.find((p)=> p.id===id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const post=data.find((p)=> p.id===id);
    post.imgUrl=req.body.imgUrl;
    post.Comments=req.body.Comments;
    post.Likes=req.body.Likes;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    data = data.filter((p)=> p.id!==id);
    res.redirect("/posts");
});
