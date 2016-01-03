/**
 * Created by Zashy on 1/1/2016.
 */

var React = require('react');
var SearchStore = require('./SearchStore');
var SearchAction = require('./SearchAction');
var Book = require('../Book');

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state =  this.getSearchState();
		this.onSearch = this.onSearch.bind(this);
	}

	getSearchState(){
		return {
			books: SearchStore.getBooks(),
			result: SearchStore.getResult()
		};
	}

	componentDidMount() {
		SearchStore.addChangeListener(this._onChange.bind(this));
	}

	onSearch() {
		SearchAction.search();
	}
	onEnter(event){
		if(event.keyCode == 13){
			SearchAction.search();
		}
	}
	onQuery(event) {
		SearchAction.query(event.target.value);
	}

	render() {
		const books = this.state.books.map(function(book){
			return <Book key={book.id} title={book.title} authors={book.authors} url={book.url} />
		});

		return (
			<div className="search-content">
				<div className="search">
					<input type="text" name="search" className="searchBar" onKeyDown={this.onEnter} onChange={this.onQuery} />
					<button onClick={this.onSearch}>Search</button>
				</div>

				<div className="results">
					{books}
				</div>
			</div>
		);
	}

	_onChange(){
		this.setState(this.getSearchState());
	}

}

module.exports = Search;