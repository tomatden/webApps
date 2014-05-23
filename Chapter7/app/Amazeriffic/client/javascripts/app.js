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

var main = function (toDoObjects) {
	var toDos = toDoObjects.map(function (toDo){
		return toDo.description;
	});

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
				$inputLabel,
				$tagInput,
				$tagLabel,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
				console.log("tag code here");
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
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
            } else if ($element.parent().is(":nth-child(4)")) {
                // input a new to-do
                $input = $("<input>").addClass("description"),
				$inputLabel = $("<p>").text("Description: "),
				$tagInput = $("<input>").addClass("tags"),
				$tagLabel = $("<p>").text("Tags: "),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input.val() !== "") {
						var description = $input.val(),
						tags = $tagInput.val().split(",");
						newToDo = {"description":description,"tags":tags};

						$.post("todos", newToDo, function(result){
							console.log("we posted and the server responded!");
							console.log(result);
							toDoObjects.push(newToDo);
	                        toDos = toDoObjects.map(function (toDo) {
								return toDo.description;
							});
	                        $input.val("");
	                        $tagInput.val("");
						});
                    }
                });

                $content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
            }

            $("main .content").append($content);
			
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function (){
	$.getJSON("todos.json", function(toDoObjects){
		main(toDoObjects);
	});
});