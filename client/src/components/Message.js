import React from 'react';

export default class Message extends React.Component {

	render() {
	    return (
			<div className="message-wrap">
				<div className={'message ' + this.props.user}>
					{this.props.children}
				</div>
			</div>
	    );
	}

}
