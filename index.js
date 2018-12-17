const express = require('express');
const request = require('request');
const rp = require('request-promise');
var cheerio = require('cheerio')
const app = express();

var options = {
    uri: 'https://www.lds.org/topics?lang=eng#letter=A',
    transform: function (body) {
        return cheerio.load(body);
    }
};

// var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Z"]
// var ids = letters.map(function(letter){
//     return 'letter=' + letter
// })
function parseTopic(url){
    return rp(url)
    .then(function(html) {
        // topic.text = 
        var text = $("#overview > .lumen-content-block:first-child > p").text();
        console.log(text)
        // arr.push(topic)
    })
    .catch(function(err) {
      //handle error
    });
}
app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
    rp(options)
    .then(function ($) {
        var obj = {}
        $(".spark-drawer__container").each(function(index, item){
        var arr = []
        $(item).find(".list--stripped > li > a").each(function(index, link) {
            var topic = {}
            topic.link = 'https://www.lds.org' + $(link).attr("href")
            topic.title = $(link).text();
            parseTopic('https://www.lds.org' + $(link).attr("href"))
            arr.push(topic)
        })
        obj[$(item).attr("id")] = arr;
        })
        res.send(obj)
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err)
    });
   
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    });