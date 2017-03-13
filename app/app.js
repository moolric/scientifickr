var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");


app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=01aa18ad6d4243ea99fd5ab3bce013e7&format=json&nojsoncallback=1&sort=interestingness-desc&tags=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Scientifickr has started");
});