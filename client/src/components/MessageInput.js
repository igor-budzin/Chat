import React from 'react';

export default class MessageInput extends React.Component {

	onSubmit(event) {
		event.preventDefault();
		if(this.messInput.value !== '') {
			this.props.onMessageSubmit.call(this);
			this.messInput.value = '';
		}
	}

	render() {
	    return (
			<div className="message-input-wrap">
				<form action="" onSubmit={this.onSubmit.bind(this)}>
					<textarea
						onChange={this.props.onMessageText}
						ref={(textarea) => { this.messInput = textarea; }}>
					</textarea>
					<button type="submit">Send</button>
				</form>
			</div>
	    );
	}
}
