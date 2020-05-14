// Using express: http://expressjs.com/
var express = require('express');
// Gustavs Pd-fetch
const fetch = require("node-fetch");
var x = 60;
var y = 100;

// Create the app
var app = express();
// Set up the server
//var server = app.listen(7200, '0.0.0.0');
var server = app.listen(7300, '192.168.1.219');

app.use(express.static('public'));


console.log("My socket server is running!!!??");

var socket = require('socket.io');

var io = socket(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', newConnection);

// We are given a websocket object in our function
function newConnection(socket) {
	console.log('We have a new client: ' + socket.id);
	socket.on('mouse', mouseData);

    // When this user emits, client side: socket.emit('otherevent',some data);
	function mouseData(data){ 
		//socket.broadcast.emit('mouse', data);
		//socket.broadcast.emit('mouse', data);
		console.log(data);

		x = data.x;
		y = data.y;	
		
		fetch("http://192.168.1.219:3558", {
			method: "PUT", 
			body: ";slider1 " + x + "; slider2 " + y + ";"
		});	
	}

	socket.on('stockholm', stockholmWeather);

	function stockholmWeather(data){
		//socket.broadcast.emit('Stockholm', data);
		console.log(data);

		temp = data.temp;
		currentWeather = 'symbol ' + data.currentWeather;

		//fetch("http://localhost:7200", {
		//	method: "PUT", 
		//	body: ";temp " + temp + "; weather " + currentWeather + ";"
		//});
	}
}












