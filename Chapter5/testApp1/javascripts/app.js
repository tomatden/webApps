var main = function () {
	"use strict";
	
	console.log("hello world!");
	
	$.getJSON("cards/aceOfSpades.json",function (card) {
		var $cardParagraph = $("<p>");
		$cardParagraph.text(card.rank + " of " + card.suit);
		$("main").append($cardParagraph);
	});
	$.getJSON("cards/hand.json",function (hand) {
		var $list = $("<ul>");
		hand.forEach(function (card) {
			var $card = $("<li>");
			$card.text(card.rank + " of " + card.suit);
			console.log(JSON.stringify(card));
			$list.append($card);
		});
		$("main").append($list);
	});
	
};

$(document).ready(main);