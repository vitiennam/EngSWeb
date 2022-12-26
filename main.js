var http = require('http')
const fs = require('fs');
// const express = require('express'); 


// const app = express(); 
// const port = 8080;

var filePath = "content/data/EWords446k.json"
let rawData = fs.readFileSync(filePath)
let 
var listWordEng = JSON.parse(rawData)
console.log("End read file")
http.createServer( function(req, res) {
    console.log(req.url )
    if(req.url == "/jsSource/searchBar.js") {
        
            
        // let searchBarjsfile = fs.readFileSync(req.url)
        fs.readFile('content/jsSource/searchBar.js', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            return;
            }
            res.writeHead(200, {'Content-Type': 'text/javascript'})
            res.write(data);
            res.end();
            // console.log(data);

        })
        
    } 
    if(req.url == '/' || req.url == '/index.html') {
        
        fs.readFile("content/index.html", function(err, data){
            
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end
        })
        
    }
 
} ).listen(8080)