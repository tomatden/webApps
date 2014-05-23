var ntwitter = require("ntwitter"),
	redis = require("redis"),
    credentials = require("./credentials.json"),
	twitter,
	client,
	counts = {},
	trackedWords = ["awesome","cool","rad","gnarly","groovy"];

twitter = ntwitter(credentials);

client = redis.createClient();

trackedWords.forEach(function(word){

	client.get(word, function(err, wordCount) {
		if (err !== null) {
			console.log("ERROR: " + err);
			return;
		}
		counts[word] = parseInt(wordCount,10) || 0;
		console.log("initializing " + word +  " to " + counts[word]);
	});

});

twitter.stream(
	"statuses/filter",
	{"track":trackedWords },
	function (stream){
		stream.on("data",function(tweet){
			trackedWords.forEach(function(word){
				if (tweet.text.indexOf(word) > -1){
					client.incr(word);
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