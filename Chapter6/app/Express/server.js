var express = require("express"), 
    http = require("http"),
    app;

app = express();
app.use(express.static(__dirname +  "/client"));
http.createServer(app).listen(3000);


console.log("Server running on port 3000");

app.get("/hello", function (req,res){
	res.send("Hello World!!");
});

app.get("/goodbye", function (req,res){
	res.send("Goodbye World!!");
});

