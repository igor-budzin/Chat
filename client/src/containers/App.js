import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import {sendMessage} from '../actions/messageActions';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			currentUser: 'Igor',
			messageArray: []
		};
		this.socket;
	}

	handleMessageText(event) {
		this.setState({messageText: event.target.value});
	}

	handleMessageSubmit() {
		if(this.state.messageText !== '') {
			this.socket.emit('sendMessage', this.state.messageText);
		}
		this.setState({
			messageText: ''
		});
	}

	componentWillMount() {
		this.socket = io.connect('http://localhost:1616');
		const _socket = this.socket;

		_socket.on('connected', function(msg) {
			console.log("Socket connected");
			_socket.emit('getMessageHistory');
    	});

		_socket.on('history', (data) => {
			console.log(data);
			this.setState({
				messageArray: data
			});
		});

		_socket.on('message', (response) => {
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
					onMessageSubmit={this.props.sendMessage}
				 />
            </div>
	    );
	}
}

function mapStateToProps(state) {
	return {

	}
}

mapDispatchToProps(dispatch) {
	return {
		sendMessage: bindActionCreators(sendMessage, dispatch)
	}
}

export default connect(mapStateToProps)(App);
