const express = require('express');
const request = require('request');
const rp = require('request-promise');
var cheerio = require('cheerio')
const app = express();

var options = {
    uri: 'https://www.lds.org/?lang=eng',
    transform: function (body) {
        return cheerio.load(body);
    }
};

app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
    rp(options)
    .then(function ($) {
        var img = $('img[alt="President Nelson"]').attr("src")
        res.send(img)
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err)
    });
   
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    });