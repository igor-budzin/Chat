const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const messageModel = require('./models/message.model');

const port = 1616;

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

mongoose.connect('mongodb://localhost:27017/Chat', {useMongoClient: true});
mongoose.set('debug', true);

app.use(bodyParser.json());

app.get('/', (req, res) => {

});

io.on('connection', function(socket){
 	console.log('a user connected');

	socket.join('all');

	socket.on('getMessageHistory', () => {
		messageModel.find({}).sort({date: 1}).lean().exec((error, messages) => {
			if(!error) socket.emit("history", messages);
		});
	});

	socket.emit('connected', `you are connected to chat as`);
	socket.on('sendMessage', function(message) {
		let data = {
			user: 'Igor',
			text: message,
			date: Date.now()
		};
		messageModel.create(data, (error) => {
			if(error) return console.error('Message Model: ', error);
			socket.emit('message', data);
			socket.to('all').emit('message', data);
		});
	});
});


const server = http.listen(port, function() {
    console.log(`Server is up and running, localhost:${port}`);
});
