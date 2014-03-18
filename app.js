/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));


// Setup your sessions, just like normal.
app.use(express.cookieParser());
app.use(express.session({secret: 'monkey'}));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/all', routes.all);
app.get('/team1', routes.team1);
app.get('/team2', routes.team2);
// app.get('/users', user.list);

// routes = require('./routes/index2')(app);

// This sets up the socket IO routing
io_routes = require('./routes/socket-io')(io);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
