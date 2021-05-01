const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["Buy Food","Cook Food","Eat Food"];
let workitems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/",function(req,res)
{

    var today = new Date();

    var options = { weekday: 'long',  month: 'long', day: 'numeric' };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list",{
        ListTitle: day, newListItems :items
    });
});


app.post("/",function(req,res){
    let item = req.body.newItem;
   if(req.body.button === "Work List"){
       workitems.push(item);
       res.redirect("/work");
   }
  else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
    res.render("list",{ListTitle:"Work List", newListItems :workitems});
});
app.post("/work",function(req,res){
    let item= req.body.newItem;
    workitems.push(item);
    res.redirect("/work");
})

app.listen(3000,function()
{console.log("Server is running on port 3000");});