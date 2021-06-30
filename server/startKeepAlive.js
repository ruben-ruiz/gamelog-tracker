var http = require("http");

function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'https://gamelog-tracker.herokuapp.com/',
            port: 80,
            path: '/',
        };
        
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try{
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            })
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();