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

	componentWillMount() {
		this.props.socketConnection().then(() => {
			this.props.getMessageHistory();
		});
		new Promise((res, rej) => {
			this.props.onNewMessage();
		})
	}

	render() {
	    return (
            <div className="container">
                <MessageList
					messageArr={this.props.messageArray}
					currentUser={this.state.currentUser}
				/>
                <MessageInput
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
		getMessageHistory: bindActionCreators(messageActions.getMessageHistory, dispatch),
		onNewMessage: bindActionCreators(messageActions.onNewMessage, dispatch),
		sendMessage: bindActionCreators(messageActions.sendMessage, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
