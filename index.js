const express = require('express');
const request = require('request');
const rp = require('request-promise');
var $ = require('cheerio')
const app = express();

var options = {
    uri: 'https://www.lds.org/topics?lang=eng#letter=A',
    transform: function (body) {
        return $.load(body);
    }
};

// var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Z"]
// var ids = letters.map(function(letter){
//     return 'letter=' + letter
// })
function parseTopic(link){
    rp(link)
    .then(function($) {
        return {
            text: $("#overview > .lumen-content-block:first-child > p").text()
        }
        
    })
    .catch(function(err) {
      //handle error
    });
}
app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
    rp(options)
    .then(function ($) {
        // var obj = {}
        var arr = [];
        $(".spark-drawer__container").each(function(index, item){
        // var arr = []
            $(item).find(".list--stripped > li > a").each(function(index, link) {
            // var topic = {}
            // topic.link = 
                arr.push('https://www.lds.org' + $(link).attr("href"))
            // topic.title = $(link).text();
            // parseTopic('https://www.lds.org' + $(link).attr("href"))
            // arr.push(topic)
            })
        // obj[$(item).attr("id")] = arr;
        // })
        })
        // return Promise.all(
        //     arr.map(function(url) {
        //       return parseTopic(url);
        //     })
        //   );
    //     })
    //    
        
    
    res.send(arr)
})
// .then(function(topicText) {
//     res.send(topicText)
// })
.catch(function (err) {
    // Crawling failed or Cheerio choked...
    console.log(err)
})
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    });