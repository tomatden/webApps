
var main = function () {
	"use strict";

	var fadeByeIn = function () {
		var $moreContent = $("<div> Bye World</div>").hide();
	    $("body").append($moreContent);
	    $moreContent.fadeIn();
	}

	var $content = $("<div> Hello World</div>").hide();
	$("body").append($content);
	$content.slideDown(2000,fadeByeIn);
}
$(document).ready(main);
