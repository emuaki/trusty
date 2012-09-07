var express = require('express');
var app = express.createServer(), io = require('socket.io').listen(app);
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d", app.address().port);

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.set('view options', {layout: false});
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/../public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

io.configure('production', function(){
    io.enable('browser client minification');
    io.enable('browser client gzip');
    io.set('transports', [
        'websocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]);
    io.set( "log level", 1 );
});


app.get('/', function(req, res){ 
    res.render('index.ejs');
});

app.get('/company', function(req, res){ 
    res.render('company.ejs');
});

app.get('/user', function(req, res){ 
    res.render('user.ejs');
});


