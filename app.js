const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

    
    const query = req.body.cityName;
    const apiKey = "5399311ff91564c4e964411e8bc3a18e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units=" + unit + "";

    https.get(url, function(response){
         console.log(response.statusCode);

         response.on("data", function(data){
            // Parse the data
            const weatherData = JSON.parse(data);

            // make new const to define 
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const iconID = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";

            // Line result
            res.write("<p> The weather currently is " + weatherDesc + "</p>")
            res.write(`<h1> The temperature in ${query} is ${temp} degrees celcius </h1> `);
            res.write("<img src='" + imgUrl + "'>");
            res.send();
         })
    })

});

    

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});
