/**
 * Created by Zashy on 1/2/2016.
 */

var React = require('react');

class Book extends React.Component {
	render(){
		return (
			<div className="book">
				<a className="title" href={this.props.url} >{this.props.title}</a>
				<span className="author-label">Author(s):</span><span className="authors">{this.props.authors}</span>
			</div>
		)
	};
};

module.exports = Book;