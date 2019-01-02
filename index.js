const express = require('express');
const request = require('request');
const rp = require('request-promise');
var $ = require('cheerio')
const app = express();

var options = {
    uri: 'https://www.lds.org/topics?lang=eng#letter=A',
    transform: function (body) {
        return cheerio.load(body);
    }
};

var links = ["https://www.lds.org/topics/aaronic-priesthood","https://www.lds.org/topics/abortion","https://www.lds.org/topics/abrahamic-covenant","https://www.lds.org/topics/abuse","https://www.lds.org/topics/accounts-of-the-first-vision","https://www.lds.org/topics/addiction","https://www.lds.org/topics/adoption","https://www.lds.org/topics/adultery","https://www.lds.org/topics/adversity","https://www.lds.org/topics/agency","https://www.lds.org/topics/alcohol","https://www.lds.org/topics/answering-gospel-questions","https://www.lds.org/topics/apostasy","https://www.lds.org/topics/apostate","https://www.lds.org/topics/apostle","https://www.lds.org/topics/christians","https://www.lds.org/topics/articles-of-faith","https://www.lds.org/topics/atonement-of-jesus-christ","https://www.lds.org/topics/baptism","https://www.lds.org/topics/baptisms-for-the-dead","https://www.lds.org/topics/becoming-like-god","https://www.lds.org/topics/bible","https://www.lds.org/topics/bible-inerrancy-of","https://www.lds.org/topics/birth-control","https://www.lds.org/topics/bishop","https://www.lds.org/topics/book-of-abraham","https://www.lds.org/topics/book-of-mormon","https://www.lds.org/topics/book-of-mormon-and-dna-studies","https://www.lds.org/topics/book-of-mormon-translation","https://www.lds.org/topics/born-again","https://www.lds.org/topics/celestial-kingdom","https://www.lds.org/topics/charity","https://www.lds.org/topics/chastity","https://www.lds.org/topics/christ","https://www.lds.org/topics/christian","https://www.lds.org/topics/christmas","https://www.lds.org/topics/church-disciplinary-councils","https://www.lds.org/topics/church-finances-commercial-businesses","https://www.lds.org/topics/church-organization?old=true","https://www.lds.org/topics/citizenship","https://www.lds.org/topics/coffee","https://www.lds.org/topics/comforter","https://www.lds.org/topics/communication","https://www.lds.org/topics/confirmation","https://www.lds.org/topics/conscience","https://www.lds.org/topics/contributions","https://www.lds.org/topics/conversion","https://www.lds.org/topics/council-in-heaven","https://www.lds.org/topics/covenant","https://www.lds.org/topics/creation","https://www.lds.org/topics/cross","https://www.lds.org/topics/crucifixion","https://www.lds.org/topics/dating-and-courtship","https://www.lds.org/topics/daughters-in-my-kingdom","https://www.lds.org/topics/deacon","https://www.lds.org/topics/death-physical","https://www.lds.org/topics/death-spiritual","https://www.lds.org/topics/debt","https://www.lds.org/topics/deification","https://www.lds.org/topics/devil","https://www.lds.org/topics/disability?lang=eng&old=true?old=true","https://www.lds.org/topics/dispensations","https://www.lds.org/topics/diversity-and-unity-in-the-church-of-jesus-christ-of-latter-day-saints","https://www.lds.org/topics/divorce","https://www.lds.org/topics/dna-and-the-book-of-mormon","https://www.lds.org/topics/doctrine-and-covenants","https://www.lds.org/topics/drugs","https://www.lds.org/topics/easter","https://www.lds.org/topics/education","https://www.lds.org/topics/elder","https://www.lds.org/topics/emergency-preparedness","https://www.lds.org/topics/emergency-response","https://www.lds.org/topics/employment","https://www.lds.org/topics/endowment","https://www.lds.org/topics/environmental-stewardship-and-conservation","https://www.lds.org/topics/eternal-life","https://www.lds.org/topics/exaltation","https://www.lds.org/topics/excommunication","https://www.lds.org/topics/faith","https://www.lds.org/topics/fall-of-adam","https://www.lds.org/topics/families","https://www.lds.org/topics/family-finances","https://www.lds.org/topics/family-history?lang=eng&old=true?old=true","https://www.lds.org/topics/family-home-evening?old=true","https://www.lds.org/topics/family-prayer","https://www.lds.org/topics/the-family-proclamation","https://www.lds.org/topics/fasting-and-fast-offerings","https://www.lds.org/topics/first-presidency","https://www.lds.org/topics/first-vision","https://www.lds.org/topics/first-vision-accounts","https://www.lds.org/topics/food-storage","https://www.lds.org/topics/foreordination","https://www.lds.org/topics/forgiveness","https://www.lds.org/topics/fornication","https://www.lds.org/topics/gambling","https://www.lds.org/topics/gardening","https://www.lds.org/topics/garments","https://www.lds.org/topics/gay","https://www.lds.org/topics/genealogy","https://www.lds.org/topics/general-authorities","https://www.lds.org/topics/gift-of-the-holy-ghost","https://www.lds.org/topics/gifts-of-the-spirit","https://www.lds.org/topics/god-the-father","https://www.lds.org/topics/godhead","https://www.lds.org/topics/gold-plates","https://www.lds.org/topics/gospel","https://www.lds.org/topics/government","https://www.lds.org/topics/grace","https://www.lds.org/topics/gratitude","https://www.lds.org/topics/grief","https://www.lds.org/topics/happiness","https://www.lds.org/topics/health","https://www.lds.org/topics/heaven","https://www.lds.org/topics/heavenly-father","https://www.lds.org/topics/heavenly-mother","https://www.lds.org/topics/hell","https://www.lds.org/topics/high-council","https://www.lds.org/topics/high-priest","https://www.lds.org/topics/holy-ghost","https://www.lds.org/topics/home-teaching","https://www.lds.org/topics/homosexuality","https://www.lds.org/topics/honesty","https://www.lds.org/topics/hope","https://www.lds.org/topics/humanitarian-service?old=true","https://www.lds.org/topics/humility","https://www.lds.org/topics/immortality","https://www.lds.org/topics/inspiration","https://www.lds.org/topics/internet","https://www.lds.org/topics/jesus-christ","https://www.lds.org/topics/jesus-christ-chosen-as-savior","https://www.lds.org/topics/joseph-smith","https://www.lds.org/topics/joseph-smiths-teachings-about-priesthood-temple-and-women","https://www.lds.org/topics/journal-of-discourses","https://www.lds.org/topics/judging-others","https://www.lds.org/topics/justice","https://www.lds.org/topics/keys-of-the-priesthood","https://www.lds.org/topics/kingdoms-of-glory","https://www.lds.org/topics/latter-day-saints","https://www.lds.org/topics/laying-on-of-hands","https://www.lds.org/topics/light-of-christ","https://www.lds.org/topics/love","https://www.lds.org/topics/marriage","https://www.lds.org/topics/media","https://www.lds.org/topics/melchizedek-priesthood","https://www.lds.org/topics/mercy","https://www.lds.org/topics/millennium","https://www.lds.org/topics/miracles","https://www.lds.org/topics/missionary-preparation?lang=eng&_r=1&old=true?old=true","https://www.lds.org/callings/missionary/missionary-training-centers?lang=eng&_r=1&old=true?old=true","https://www.lds.org/topics/missionary-work","https://www.lds.org/topics/modesty","https://www.lds.org/topics/mormon-church","https://www.lds.org/topics/mormonism","https://www.lds.org/topics/mormons","https://www.lds.org/topics/mormons-and-christianity","https://www.lds.org/topics/mortality","https://www.lds.org/topics/mother-in-heaven","https://www.lds.org/topics/mountain-meadows-massacre","https://www.lds.org/topics/movies-and-television","https://www.lds.org/topics/music","https://www.lds.org/topics/new-testament","https://www.lds.org/topics/noah","https://www.lds.org/topics/obedience","https://www.lds.org/topics/old-testament","https://www.lds.org/topics/ordinances","https://www.lds.org/topics/original-sin","https://www.lds.org/topics/paradise","https://www.lds.org/topics/parenting","https://www.lds.org/topics/patriarch","https://www.lds.org/topics/patriarchal-blessings","https://www.lds.org/topics/peace","https://www.lds.org/topics/peace-and-violence-among-19th-century-latter-day-saints","https://www.lds.org/topics/pearl-of-great-price","https://www.lds.org/topics/peer-pressure","https://www.lds.org/topics/pef-self-reliance?old=true","https://www.lds.org/topics/personal-revelation","https://www.lds.org/topics/physical-death","https://www.lds.org/topics/plan-of-salvation?old=true?old=true","https://www.lds.org/topics/plural-marriage-in-the-church-of-jesus-christ-of-latter-day-saints","https://www.lds.org/topics/polygamy","https://www.lds.org/topics/pornography","https://www.lds.org/topics/postmortality","https://www.lds.org/topics/prayer","https://www.lds.org/topics/pre-earth-life","https://www.lds.org/topics/premortal-existence","https://www.lds.org/topics/premortality","https://www.lds.org/topics/priest","https://www.lds.org/topics/priesthood","https://www.lds.org/topics/priesthood-and-race","https://www.lds.org/topics/priesthood-blessing","https://www.lds.org/topics/primary","https://www.lds.org/topics/profanity","https://www.lds.org/topics/prophecy","https://www.lds.org/topics/prophets","https://www.lds.org/topics/proxy-baptism","https://www.lds.org/topics/quorum","https://www.lds.org/topics/quorum-of-the-twelve-apostles","https://www.lds.org/topics/quorums-of-the-seventy","https://www.lds.org/topics/race-and-the-priesthood","https://www.lds.org/topics/relief-society","https://www.lds.org/topics/religious-freedom","https://www.lds.org/topics/repentance","https://www.lds.org/topics/restoration-of-the-gospel","https://www.lds.org/topics/resurrection","https://www.lds.org/topics/revelation","https://www.lds.org/topics/reverence","https://www.lds.org/topics/sabbath","https://www.lds.org/topics/sacrament","https://www.lds.org/topics/sacrament-meeting","https://www.lds.org/topics/sacrifice","https://www.lds.org/topics/salvation","https://www.lds.org/topics/same-sex-attraction","https://www.lds.org/topics/same-sex-marriage","https://www.lds.org/topics/satan","https://www.lds.org/topics/saved","https://www.lds.org/topics/scriptures","https://www.lds.org/topics/sealing","https://www.lds.org/topics/second-coming-of-jesus-christ","https://www.lds.org/topics/self-reliance","https://www.lds.org/topics/service","https://www.lds.org/topics/seventy","https://www.lds.org/topics/sexual-immorality","https://www.lds.org/topics/signs","https://www.lds.org/topics/sin","https://www.lds.org/topics/single-members-of-the-church","https://www.lds.org/topics/single-parent-families","https://www.lds.org/topics/smith-joseph-jr","https://www.lds.org/topics/soul","https://www.lds.org/topics/spaulding-manuscript","https://www.lds.org/topics/spirit","https://www.lds.org/topics/spirit-children-of-heavenly-parents","https://www.lds.org/topics/spirit-of-the-lord","https://www.lds.org/topics/spirit-of-truth","https://www.lds.org/topics/spirit-prison","https://www.lds.org/topics/spirit-world","https://www.lds.org/topics/spiritual-death","https://www.lds.org/topics/spiritual-experiences","https://www.lds.org/topics/spiritual-gifts","https://www.lds.org/topics/stake","https://www.lds.org/topics/standard-works","https://www.lds.org/topics/stewardship","https://www.lds.org/topics/study","https://www.lds.org/topics/suicide","https://www.lds.org/topics/sunday","https://www.lds.org/topics/swearing","https://www.lds.org/topics/tattooing","https://www.lds.org/topics/tea","https://www.lds.org/topics/teaching-the-gospel","https://www.lds.org/topics/telestial-kingdom","https://www.lds.org/topics/temples","https://www.lds.org/topics/temptation","https://www.lds.org/topics/ten-commandments","https://www.lds.org/topics/terrestrial-kingdom","https://www.lds.org/topics/testimony","https://www.lds.org/topics/family-proclamation?old=true?old=true","https://www.lds.org/topics/tithing","https://www.lds.org/topics/tobacco","https://www.lds.org/topics/transgression","https://www.lds.org/topics/translation-and-historicity-of-the-book-of-abraham","https://www.lds.org/topics/trials","https://www.lds.org/topics/unity","https://www.lds.org/topics/unwed-pregnancy","https://www.lds.org/topics/urim-and-thummim","https://www.lds.org/topics/vicarious-work","https://www.lds.org/topics/virtue","https://www.lds.org/topics/visiting-teaching","https://www.lds.org/topics/war","https://www.lds.org/topics/war-in-heaven","https://www.lds.org/topics/ward","https://www.lds.org/topics/welfare?old=true","https://www.lds.org/topics/women-in-the-church","https://www.lds.org/topics/word-of-wisdom","https://www.lds.org/topics/worship","https://www.lds.org/topics/zion"];


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
    links.forEach(function(link){
        rp(link)
        .then(function (html) {
            console.log(html)
            // var text = $('#overview > .lumen-content-block:first-child > p', html).text()  
            // res.send(text)
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log(err)
        })
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