/**
 * Created by Zashy on 1/1/2016.
 */

var React = require('react');

class Sidebar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="sidebar">
				<ul className="list">
					<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
					<li>Aliquam tincidunt mauris eu risus.</li>
					<li>Vestibulum auctor dapibus neque.</li>
				</ul>
			</div>
		);
	}

}

module.exports = Sidebar;