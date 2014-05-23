var express = require("express"), 
    http = require("http"),
    bp = require("body-parser"),
	mongoose = require("mongoose"),
    app = express();

app.use(express.static(__dirname +  "/client"));

app.use(bp.urlencoded());

var dbURI = 'mongodb://localhost/amazeriffic';

mongoose.connect(dbURI);

mongoose.connection.on('error', function (err) {
 console.log("error connecting");
});

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});


var TodoSchema = new mongoose.Schema({
  description: String
, tags: [ String ]
});

var ToDo = mongoose.model('ToDo', TodoSchema);

http.createServer(app).listen(3000);
console.log("Server running on port 3000");

app.get("/todos.json", function (req, res) {
	ToDo.find({},function(err,toDos) {
		res.json(toDos);
	});
});

app.get("/hello", function (req,res){
	res.send("Hello World!!");
});

app.get("/goodbye", function (req,res){
	res.send("Goodbye World!!");
	
});

app.post("/todos", function(req,res){
	console.log(req.body.description);
	console.log(req.body.tags);
	var newToDo = new ToDo({description: req.body.description, tags: req.body.tags});
	newToDo.save(function(err,result){
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		}
		else {
			ToDo.find({},function(err,result){
				if (err!==null){
					res.send("ERROR");
				}
				res.json(result);
			});
		}
	});

});
