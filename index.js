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



// app.set('port', (process.env.PORT || 5000));
// app.get('/', function(req, res){
//     rp(options)
//     .then(function ($) {
//         var obj = {}
//         $(".spark-drawer__container").each(function(index, item){
//             var arr = []
//             $(item).find(".list--stripped > li > a").each(function(index, link) {
//                 var topic = {}
//                 topic.link = $(link).attr("href")
//                 topic.title = $(link).text();
//                 arr.push(topic)
//             })
//             obj[$(item).attr("id")] = arr;
//         })   
//         res.send(obj)
        
//     })
//     .catch(function (err) {
//         // Crawling failed or Cheerio choked...
//         console.log(err)
//     })
// })
app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res){
    rp(options)
    .then(function ($) {
        var arr = []
        $(".spark-drawer__container").each(function(index, item){
            
            $(item).find(".list--stripped > li > a").each(function(index, link) {
                var url = 'https://www.lds.org' + $(link).attr("href")
                arr.push(url)
            })
            
            arr.forEach(function(link){
                rp(link)
                .then(function (html) {
                    var text = $('#overview > .lumen-content-block:first-child > p', html).text();
                    res.send(text)
                })
            })
        })   
       
        
    })
    // .then(function(array){
    //     array.forEach(function(link){
    //         rp(link)
    //         .then(function (html) {
    //             var text = cheerio('#overview > .lumen-content-block:first-child > p', html).text();
    //             res.send(text)
    //         })
    //     })
    // })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err)
    })
})

// app.set('port', (process.env.PORT || 5000));
// app.get('/', function(req, res){
//     rp(options)
//     .then(function ($) {
//         var obj = {}
//         $(".spark-drawer__container").each(function(index, item){ 
//             var arr = []
//             $(item).find(".list--stripped > li > a").each(function(index, link) {
//                 var topic = {};
//                 var url = 'https://www.lds.org' + $(link).attr("href");
//                 rp(url)
//                 .then(function(html){
//                     // var topic = {}
//                     topic.a = url;
//                     topic.title = $(link).text();
//                     topic.text = $('#overview > .lumen-content-block:first-child > p', html).text()
//                     arr.push(topic);
//                     console.log("Array ", arr)
//                     // return obj;
//                     obj[$(item).attr("id")] = arr;
//                 })
//             })
//             // obj[$(item).attr("id")] = arr;
//         })   
//     })
//     .catch(function (err) {
//         // Crawling failed or Cheerio choked...
//         console.log(err)
//     })
// })




// var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Z"]
// var ids = letters.map(function(letter){
//     return 'letter=' + letter
// })


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    });