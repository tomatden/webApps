var ntwitter = require("ntwitter"),
    credentials = require("./credentials.json"),
	twitter,
	counts = {},
	trackedWords = ["awesome","cool","rad","gnarly","groovy"];

trackedWords.forEach(function(word){
	counts[word] = 0;
});

	
twitter = ntwitter(credentials);

twitter.stream(
	"statuses/filter",
	{"track":trackedWords },
	function (stream){
		stream.on("data",function(tweet){
			trackedWords.forEach(function(word){
				if (tweet.text.indexOf(word) > -1){
					counts[word] = counts[word] + 1;
				}
			});
		});
	}
);

setInterval(function()	{
							trackedWords.forEach(function(word){
								console.log(word +": " + counts[word]);
							});
						}
						,3000);
						
module.exports = counts;