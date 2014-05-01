   var toDoObjects = [
	{
		"description":"Get groceries",
		"tags": ["shopping","chores"] 
	},

	{
		"description":"Make up some new todos",
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

var elementExists = function(array, element){
	var arrayLength = array.length;
	for (var i = 0; i < arrayLength; i++) {
	    if (element === array[i])
			return true;
    }
	return false;
}

var organizeByTags = function (toDoObjects){
	console.log("organize by tags called");
	
	var tagArray = [];
	var arrayLength
	toDoObjects.forEach(function(toDoObject){
		arrayLength = toDoObject.tags.length;
		for (var i = 0; i < arrayLength; i++) {
			if (!(elementExists(tagArray, toDoObject.tags[i])))
				tagArray.push(toDoObject.tags[i]);
		}
	})
	tagObjectArray = [];
	for (var i = 0; i < tagArray.length; i++) {
		
		console.log(tagArray[i]);
		var tagObject={};
		var todoArray = [];
		toDoObjects.forEach(function(toDoObject){
			tagObject.name = tagArray[i];
			arrayLength = toDoObject.tags.length;
			for (var j = 0; j < arrayLength; j++) {
				if (toDoObject.tags[j]===tagArray[i])
					todoArray.push(toDoObject.description);
			}
			tagObject.toDos = todoArray;
		})
		tagObjectArray.push(tagObject);
	}
	return tagObjectArray;
	
};

var main = function () {
	"use strict";
	var $content;
	var tagObjects = {};
	tagObjects = organizeByTags(toDoObjects);
	$content = $("<ul>");
    tagObjects.forEach(function (tag) {
		var $tagName = $("<h3>").text(tag.name),
		$content = $("<ul>");
		tag.toDos.forEach(function(description){
			var $li = $("<li>").text(description);
			$content.append($li);
		})
		$("main").append($tagName);
		$("main").append($content);
    });


    	
		
		
};



$(document).ready(main);