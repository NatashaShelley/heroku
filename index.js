// const express = require('express');
// const request = require('request');
// const rp = require('request-promise');
// var $ = require('cheerio')
// const app = express();

// var options = {
//     uri: 'https://www.lds.org/topics?lang=eng#letter=A',
//     transform: function (body) {
//         return $.load(body);
//     }
// };


// var data = [];
// var total = 0;
// var complete = 0;


// app.set('port', (process.env.PORT || 5000));

// app.get('/', function(req, res){
//     data = [];
//     total = 0;
//     complete = 0;

//     //get list
//     function getDetails(obj){
//         rp(obj.link)
//         .then(function (html) {
//            var text = $('#overview > .lumen-content-block:first-child > p', html).text() 
//             obj.desc = text;
//             complete++ 
//             console.log("complete ", complete)
//             console.log("total ",total)
//         })
//         .catch(function (err) {
//             // Crawling failed or Cheerio choked...
//             console.log(err)
//         })
//     }

//     //get list
//     rp(options)
//     .then(function ($) {
//         $(".spark-drawer__container").each(function(index, item){
//             $(item).find(".list--stripped > li > a").each(function(index, link) {
//                 var topic = {}
//                 topic.link = 'https://www.lds.org' + $(link).attr("href")
//                 topic.title = $(link).text();
//                 data.push(topic);
//                 getDetails(topic);
//             })
//         })  
        
       
//         res.send('Process Started.')
//         total = data.length;
//         // data.forEach(getDetails)
//     })
//     .catch(function (err) {
//         // Crawling failed or Cheerio choked...
//         console.log(err)
//     })
// })


// // app.get('/progress', function(req, res){
// //     res.send(complete/total *100)
// // })
// app.get('/data', function(req, res){
//     res.send(data)
// })


// // var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Z"]
// // var ids = letters.map(function(letter){
// //     return 'letter=' + letter
// // })


// app.listen(app.get('port'), function() {
//     console.log('Node app is running on port', app.get('port'));
//     });


const express = require('express');
const request = require('request');
const rp = require('request-promise');
var $ = require('cheerio')
const app = express();

var options = {
    uri: 'https://www.mormonnewsroom.org/',
    transform: function (body) {
        return $.load(body);
    }
};


var data = [];
var total = 0;
var complete = 0;


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
    data = [];
    total = 0;
    complete = 0;

    //get list
    function getDetails(obj){
        console.log("obj ",obj)
        rp(obj.link)
        .then(function (html) {
           var text = $('meta[property="og:description"]', html).attr("content") 
            obj.desc = text;
            complete++ 

            console.log("complete ", complete)
            console.log("total ",total)
            console.log("desc ",obj.desc)
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log(err)
        })
    }

    //get list
    rp(options)
    .then(function ($) {
        $(".blog-blocks .blog-block").each(function(index, item){
            var topic = {}
            var rawLink = $(item).find("a").attr("href");
            var url = rawLink.charAt(0) === "/" ? "https://www.mormonnewsroom.org" + rawLink : rawLink;
            var rawimg = $(item).find("img").attr("src");
            var pic = rawimg.charAt(0) === "/" ? "https://www.mormonnewsroom.org" + rawimg : rawimg;
            topic.link = url;
            topic.img = pic;
            topic.title = $(item).find("h3").text();
            topic.meta = $(item).find(".blog-block-text .bold-text").text();
            topic.date = $(item).find(".dateline").html();
            data.push(topic);
            getDetails(topic);
        })  
        
       
        res.send('Process Started.')
        total = data.length;
        // data.forEach(getDetails)
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err)
    })
})


// app.get('/progress', function(req, res){
//     res.send(complete/total *100)
// })
app.get('/data', function(req, res){
    res.send(data)
})


// var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Z"]
// var ids = letters.map(function(letter){
//     return 'letter=' + letter
// })


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    });