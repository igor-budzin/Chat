import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, subscribe} from 'redux';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import * as socketActions from '../actions/socketActions';
import * as messageActions from '../actions/messageActions';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			currentUser: 'Igor'
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
		this.props.socketConnection();
		this.props.getMessageHistory();
		// _socket.on('history', (data) => {
		// 	console.log(data);
		// 	this.setState({
		// 		messageArray: data
		// 	});
		// });
        //
		// _socket.on('message', (response) => {
		// 	const newMessageArray = this.state.messageArray;
		// 	newMessageArray.push(response);
		// 	this.setState({
		// 		messageArray: newMessageArray
		// 	});
		// 	console.log(this.state.messageArray);
		// });

	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	nextProps.messageArray !== this.props.messageArray;
	// }

	render() {
		console.log(this.props.messageArray);
	    return (
            <div className="container">
                <MessageList
					messageArr={this.props.messageArray}
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
		messageArray: state.messageReducer.messageArray
	}
}

function mapDispatchToProps(dispatch) {
	return {
		socketConnection: bindActionCreators(socketActions.socketConnectionRequest, dispatch),
		getMessageHistory: bindActionCreators(messageActions.getMessageHistory, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
