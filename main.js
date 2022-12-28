var http = require('http')
const https = require('node:https');
const fs = require('fs');
const axios = require('axios')
// const express = require('express'); 


// const app = express(); 
// const port = 8080;

var filePathData = "content/data/EWords2.json"
var indexHtmlpath = 'content/index.html'
var searchBarJSPath = 'content/jsSource/searchBar.js'
var cssIndexPath = 'content/css/index.css'
var flashCardhtml = 'content/flash_card.html'
var flashCardJS = 'content/jsSource/flashCard.js'

let indexHtml = fs.readFileSync(indexHtmlpath)
let searchBarjsfile = fs.readFileSync(searchBarJSPath)
let rawData = fs.readFileSync(filePathData)
let cssIndexFile = fs.readFileSync(cssIndexPath)
let flashCardhtmlfile = fs.readFileSync(flashCardhtml)
let flashCardJSFile = fs.readFileSync(flashCardJS)

var listWordEng = JSON.parse(rawData)
async function fetch_sync(urlSearch)
{
	const resp = await fetch(urlSearch)

	return resp
}
console.log("End read file")
http.createServer( function(req, res) {
    console.log(req.url )
    if (req.url.includes('queryWordO')) {
        console.log(req.url.includes('queryWordO'))
        var searchedWord = req.url.split("=")[1]
        console.log(searchedWord)
        var urlSearchOxford = "https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ searchedWord+ "?q="+ searchedWord
        var urlSearchCam = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + searchedWord

        
        console.log(urlSearchOxford)
        
        try {
            axios(urlSearchOxford).then((response) => {
              
            //   console.log(html);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(response.data)
            // pageSearch += `<div class="col">` + response.data + `</div>`
            });
          } catch (error) {
            console.log(error, error.message);
          }

    }
    if (req.url.includes('queryWordC')) {
        console.log(req.url.includes('queryWordC'))
        var searchedWord = req.url.split("=")[1]
        console.log(searchedWord)
        var urlSearchCam = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + searchedWord
       
        
        console.log(urlSearchCam)
        
        try {
            axios(urlSearchCam).then((response) => {
              
            //   console.log(html);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(response.data)
            // pageSearch += `<div class="col">` + response.data + `</div>`
            });
          } catch (error) {
            console.log(error, error.message);
          }

    }
    if (req.url.includes('queryWordGG')) {
        console.log(req.url.includes('queryWordGG'))
        var searchedWord = req.url.split("=")[1]
        console.log(searchedWord)
        var urlSearchGG = "https://translate.google.com/?hl=vi&sl=en&tl=vi&text="+searchedWord+"&op=translate"
       
        
        console.log(urlSearchGG)
        
        try {
            axios(urlSearchGG).then((response) => {
              
            //   console.log(html);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(response.data)
            // pageSearch += `<div class="col">` + response.data + `</div>`
            });
          } catch (error) {
            console.log(error, error.message);
          }

    }
    switch(req.url) {
        case '/jsSource/searchBar.js':
            // fs.readFile('content/jsSource/searchBar.js', 'utf8', (err, data) => {
            //     if (err) {
            //     console.error(err);
            //     return;
            //     }
            res.writeHead(200, {'Content-Type': 'text/javascript'})
            res.write(searchBarjsfile);
            res.end();
                // console.log(data);
    
            // })
            break
        case '/' :
            // fs.readFile("content/index.html", function(err, data){
            
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(indexHtml)
                res.end
            // })
            break
        case '/index.html':
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(indexHtml)
            res.end
            break
        case '/engDataSearch':
            // res.write(rawData)
            res.end(JSON.stringify(listWordEng))
            break
        case '/css/index.css':
            res.writeHead(200,{'Content-Type': 'text/css'})
            res.end(cssIndexFile)
            break
        case '/flash_card.html':
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.end(flashCardhtmlfile)
            break
        case '/jsSource/flashCard.js':
            res.writeHead(200,{'Content-Type': 'text/javascript'})
            res.end(flashCardJSFile)
            break
        case '/randomWord':
            res.end(listWordEng[Math.floor(Math.random() * listWordEng.length)])
            break

    }
    // if(req.url == "/jsSource/searchBar.js") {
        
            
    //     // let searchBarjsfile = fs.readFileSync(req.url)
    //     fs.readFile('content/jsSource/searchBar.js', 'utf8', (err, data) => {
    //         if (err) {
    //         console.error(err);
    //         return;
    //         }
    //         res.writeHead(200, {'Content-Type': 'text/javascript'})
    //         res.write(data);
    //         res.end();
    //         // console.log(data);

    //     })
        
    // } 
    // if(req.url == '/' || req.url == '/index.html') {
        
    //     fs.readFile("content/index.html", function(err, data){
            
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.write(data)
    //         res.end
    //     })
        
    // }
 
} ).listen(8080)