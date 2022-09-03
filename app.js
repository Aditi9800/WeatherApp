const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("form")
})

let location="";
app.post("/",function(req,res){
    location=req.body.location;
    console.log(req.body.location);
    res.redirect("/home");
})

app.get("/home",function(req,res){
     const url="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&q="+location+"&units=metric&appid=7eec5776b5dd83c5de82a0368ff11bc8";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData= JSON.parse(data)
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
           const icon=weatherData.weather[0].icon;

           const icon_image="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            

            console.log(temp);
            res.render("home",{
                temp:temp,
                weatherDescription:weatherDescription,
                icon_image:icon_image,
                location:location       
            })
           // res.send("the temp in the Lucknow is "+temp+" degrees celsius")
        })
    })
  
 //   res.send("Hi")
})
app.listen(3000,function(){
    console.log("server is running on localhost 3000");
})























