var express = require("express"), 
    http = require("http"),
    bp = require("body-parser"),
    app = express();

toDos = [
		{
			"description":"Get groceries",
			"tags": ["shopping","chores"] 
		},

		{
			"description":"Make up some new tooodos",
			"tags": ["writing","work"] 
		},

		{
			"description":"Prep for Monday's class",
			"tags": ["work","teaching"] 
		},

		{
			"description":"Answer emails",
			"tags": ["work"] 
		},

		{
			"description":"Take Gracie to the park",
			"tags": ["pets","chores"] 
		},

		{
			"description":"Finish writing this book",
			"tags": ["writing","work"] 
		}

	];

app.use(express.static(__dirname +  "/client"));

app.use(bp.urlencoded());

http.createServer(app).listen(3000);
console.log("Server running on port 3000");

app.get("/todos.json", function (req, res) {
	res.json(toDos);
});

app.get("/hello", function (req,res){
	res.send("Hello World!!");
});

app.get("/goodbye", function (req,res){
	res.send("Goodbye World!!");
	
});

app.post("/todos", function(req,res){
	var newToDo = req.body;
	console.log(newToDo);

	toDos.push(newToDo);
	
	res.json({"message":"you posted to the server!"});
});