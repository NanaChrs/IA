var app=require('express')(),
    server=require('http').createServer(app),
    io=require('socket.io').listen(server),
    fs=require('fs'),
    ent=require('ent'),
    //SaveAs=require(''),
    events=require('events');


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('save', function(nom, json) {
        
    });

    socket.on('load', function(nom){

    });

});

app.get('/', function (req, res) {
    fs.readFile("index.html", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are not found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgResp);   

            // var msg = require('./script.js');
            // console.log(msg);
        }    
        res.end();
    });
});

app.get('/clmtrackr.js', function (req, res) {
    fs.readFile("./clmtrackr.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});

app.get('/UI-Checkbox-master/checkbox.js', function (req, res) {
    fs.readFile("./UI-Checkbox-master/checkbox.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});


app.get('/three.js', function (req, res) {
    fs.readFile("./three.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});


app.get('/vertices.js', function (req, res) {
    fs.readFile("./vertices.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});


app.get('/filresdeform.js', function (req, res) {
    fs.readFile("./filresdeform.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});

app.get('/jscolor.js', function (req, res) {
    fs.readFile("./jscolor.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
})

app.get('/range.css', function (req, res) {
    fs.readFile("./range.css", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(pgResp);   
        }    
        res.end();
    });
});

app.get('/UI-Checkbox-master/checkbox.css', function (req, res) {
    fs.readFile("./UI-Checkbox-master/checkbox.css", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(pgResp);   
        }    
        res.end();
    });
});


app.get('/deformation.js', function (req, res) {
    fs.readFile("./deformation.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});


app.get('/script.js', function (req, res) {
    fs.readFile("./script.js", function (error, pgResp) {
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.write(pgResp);   
        }    
        res.end();
    });
});


server.listen(8080);