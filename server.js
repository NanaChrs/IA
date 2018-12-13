var express=require('express');
var http=require('http');
var fs=require('fs');
var jscolor=require('./jscolor');
var clm=require('./clmtrackr');
var deformation=require('./deformation');
var filtresdeform=require('./filresdeform');
var script=require('./script');
var utils=require('./utils');
var vertices=require('./vertices');

http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    script.start();
}).listen(8080);