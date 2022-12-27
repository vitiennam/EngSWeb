var http = require('http')
const https = require('node:https');
const fs = require('fs');
const { stringify } = require('querystring');
// const express = require('express'); 


// const app = express(); 
// const port = 8080;

var filePathData = "content/data/EWords2.json"
var indexHtmlpath = 'content/index.html'
var searchBarJSPath = 'content/jsSource/searchBar.js'


let indexHtml = fs.readFileSync(indexHtmlpath)
let searchBarjsfile = fs.readFileSync(searchBarJSPath)
let rawData = fs.readFileSync(filePathData)
var listWordEng = JSON.parse(rawData)

console.log("End read file")
http.createServer( function(req, res) {
    console.log(req.url )
    if (req.url.includes('queryWord')) {
        console.log(req.url.includes('queryWord'))
        var searchedWord = req.url.split("=")[1]
        console.log(searchedWord)
        var urlSearch = "https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ searchedWord+ "?q="+ searchedWord
        console.log(urlSearch)
        const reqw = https.request(urlSearch, (resw) => {
            console.log('statusCode:', resw.statusCode);
            console.log('headers:', resw.headers);
        
            resw.on('data', (d) => {
            process.stdout.write(d);
            console.log("data "+ String(d))
            });
        
        }).on('error', (e) => {
            console.error(e);
        });
        console.log('reqw: '+stringify(reqw))
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