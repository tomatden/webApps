var main = function () {
    "use strict";

    var addCommentFromInputBox = function (){
    	var $new_comment = $("<p>");
    	var comment_text = $(".comment-input input").val();
    	if (comment_text !== "") {
	    	$new_comment.text(comment_text);
	    	$new_comment.hide();
    	    $(".comments").append($new_comment);
    	    $new_comment.fadeIn();
    	    comment_text = "";
    	    $(".comment-input input").val(comment_text);
    	} 
    };

    $(".comment-input button").on("click", function (event) {
    	addCommentFromInputBox();
    });

    $(".comment-input input").on("keypress",function (event) {
    	if (event.keyCode === 13){
    		addCommentFromInputBox();
    	}
    });

};

$(document).ready(main);