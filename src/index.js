var React = require('react');
var render = require('react-dom').render;
var Search = require('./components/search/Search.js');
var Sidebar = require('./components/Sidebar.jsx');

class App extends React.Component {
	render () {
		return (
			<div className="container">
				<header className="header">Code Challenge</header>
				<main className="main">
					<Sidebar />
					<Search />
				</main>
				<footer className="footer">
					<div className="footer-text">The bottom</div>
				</footer>
			</div>
		);
	}
}
/**/

render(<App/>, document.getElementById('app'));
