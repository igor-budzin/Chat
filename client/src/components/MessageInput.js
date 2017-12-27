import React from 'react';

export default class MessageInput extends React.Component {

	render() {
	    return (
			<div className="message-input-wrap">
				<form action="" onSubmit={this.props.onMessaegSubmit}>
					<textarea onChange={this.props.onMessageText}></textarea>
					<button type="submit">Send</button>
				</form>
			</div>
	    );
	}
}
