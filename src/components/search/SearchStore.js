/**
 * Created by Zashy on 1/2/2016.
 */

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

let _books = [];
let _result = "none";
let _query = '';

function fetchSearch(callback){
	const apiURL = "https://www.googleapis.com/books/v1/volumes";
	const apiKey = "AIzaSyC6HmLWi8Y-tuqYPn6dIWomyHl6C4K0Hf0";
	let query = encodeURIComponent(_query);
	let encodedURL = apiURL + '?q=' + query + '&key=' + apiKey;

	let header = new Headers();
	let init = {
		method: 'GET',
		headers: header,
		mode: 'cors'
	};
	_result = 'fetching';
	fetch(encodedURL, init).then(function(response){
		//if(response.status>=200 && response.status<300) {
			return response.json();
		//}
		throw new error("Status not OK");
	}).then(function(results){
		searchResponse(results);
		callback();
	}).catch(function(error){
		searchFailed(error);
		callback();
	});
}

function searchResponse(results){
	_result="success";

	_books = results.items.map(item => ({
		id: item.id,
		title: item.volumeInfo.title,
		authors: !item.volumeInfo.authors ? '' : item.volumeInfo.authors.join(', '),
		url: item.volumeInfo.infoLink
	}));

	_books.sort(function(a, b){
		if(a.title > b.title){
			return 1;
		}
		if(a.title < b.title){
			return -1;
		}
		return 0;
	});
}

function searchFailed(error){
	_result="failed";
}

function setQueryText(text){
	_query = text;
}

var SearchStore = assign({}, EventEmitter.prototype, {
	getBooks: function(){
		return _books;
	},

	getResult: function(){
		return _result;
	},

	emitChange: function(){
		this.emit('change')
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},

	dispatcherIndex: AppDispatcher.register(function(payload) {
		var text=payload.text.trim();

		switch(payload.actionType){
			case 'search':
				if (_query !== '') {
					fetchSearch(SearchStore.emitChange.bind(SearchStore));
				}
				break;
			case 'query':
				setQueryText(text);
				break;
		}

		return true; // No errors. Needed by promise in Dispatcher.
	})

});


module.exports = SearchStore;