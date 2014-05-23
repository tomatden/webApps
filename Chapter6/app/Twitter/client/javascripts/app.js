var main = function () {
	"use strict";
	
	var insertCountsIntoDOM = function (wordCounts) {
		var $line;
		$("main .counts").empty();
		for (var word in wordCounts){
			console.log(word);
			console.log(wordCounts[word]);
			$line = $("<p>").text(word + ": " + wordCounts[word]);
			$("main .counts").append($line);			
		}
	}
	
	setInterval(function(){
		$.getJSON("/counts.json", insertCountsIntoDOM);
	}, 4000);
	
}

$(document).ready(main);