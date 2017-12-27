import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			currentUser: 'Igor',
			messageArray: [
				{userName: "Igor", textMessage: "Test text", date: 1514236720633},
				{userName: "Alex", textMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", date: 1514236720633},
				{userName: "Alex", textMessage: "Hello, world", date: 1514236720633},
				{userName: "Igor", textMessage: "Hello Alex, How are you?", date: 1514236720633},
				{userName: "Alex", textMessage: "I'm fine, Thnaks.", date: 1514236720633}
			]
		};
		this.socket;
	}

	handleMessageText(event) {
		this.setState({messageText: event.target.value});
	}

	handleMessageSubmit(event) {
		event.preventDefault();
		if(this.state.messageText !== '') {
			this.socket.emit('message', this.state.messageText);
		}
	}

	componentWillMount() {
		this.socket = io.connect('http://localhost:1616');
		this.socket.on('connected', function(msg) {
        	console.log("socket connected");
    	});

		this.socket.on('msg', (response) => {
			const newMessageArray = this.state.messageArray;
			newMessageArray.push(response);
			this.setState({
				messageArray: newMessageArray
			});
			console.log(this.state.messageArray);
		});

	}

	render() {
	    return (
            <div className="container">
                <MessageList
					messageArr={this.state.messageArray}
					currentUser={this.state.currentUser}
				/>
                <MessageInput
					onMessageText={this.handleMessageText.bind(this)}
					onMessaegSubmit={this.handleMessageSubmit.bind(this)}
				 />
            </div>
	    );
	}

}
