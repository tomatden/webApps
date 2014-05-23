var ntwitter = require("ntwitter"),
	redis = require("redis"),
    credentials = require("./credentials.json"),
	twitter,
	services,
	redisCredentials,
	client,
	counts = {},
	trackedWords = ["awesome","cool","rad","gnarly","groovy"];

twitter = ntwitter(credentials);

if (process.env.VCAP_SERVICES){
	services = JSON.parse(process.env.VCAP_SERVICES);
	console.log("--services--");
	console.log(services);
	redisCredentials = services["rediscloud"][0].credentials;
} else {
	redisCredentials = {
		"hostname":"127.0.0.1",
		"port":"6379",
		"password":null
	};
}

client = redis.createClient(redisCredentials.port, redisCredentials.hostname);
client.auth(redisCredentials.password);

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