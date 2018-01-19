import React from 'react';
import Message from './Message';

export default class MessageList extends React.Component {

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return nextProps.messageArr !== this.props.messageArr;
	// }

	render() {
		const currentUser = this.props.currentUser;
		console.log("Message List: ", this.props.messageArr);
		return (
			<div className="message-list">
				{
					this.props.messageArr.map((message, index) => {
						return (
							<Message
								key={index}
								user={message.user}
								my={message.user == currentUser ? 'my' : ''}>
								{message.text}
							</Message>
						)
					})
				}
			</div>
		);
	}
}
