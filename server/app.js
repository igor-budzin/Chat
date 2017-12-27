const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const port = 1616;
const messageArray = [
	{userName: "Igor", textMessage: "Test text", date: 1514236720633},
	{userName: "Alex", textMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", date: 1514236720633},
	{userName: "Alex", textMessage: "Hello, world", date: 1514236720633},
	{userName: "Igor", textMessage: "Hello Alex, How are you?", date: 1514236720633},
	{userName: "Alex", textMessage: "I'm fine, Thnaks.", date: 1514236720633}
];

(function() {
	// Step 1: Create & configure a webpack compiler
	var webpack = require('webpack');
	var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../webpack.config');
	var compiler = webpack(webpackConfig);

	// Step 2: Attach the dev middleware to the compiler & the server
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	// Step 3: Attach the hot middleware to the compiler & the server
	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
})();

app.use(bodyParser.json());

app.get('/', (req, res) => {

});

io.on('connection', function(socket){
 	console.log('a user connected');

	socket.join('all');

	socket.on('getMessageHistory', () => {
		socket.emit("history", messageArray);
	});

	socket.emit('connected', `you are connected to chat as`);
	socket.on('sendMessage', function(message) {
		let data = {
			userName: 'Igor',
			textMessage: message,
			date: Date.now()
		}
		socket.emit('message', data);
		socket.to('all').emit('message', data);
	});
});


const server = http.listen(port, function() {
    console.log(`Server is up and running, localhost:${port}`);
});
