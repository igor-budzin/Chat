import React from 'react';

export default class Message extends React.Component {
	render() {
	    return (
			<div className="message-wrap">
				<div className="userName">{this.props.user}</div>
				<div className="message">
					{this.props.children}
				</div>
			</div>
	    );
	}
}
