var AppDispatcher = require('../../dispatcher/AppDispatcher');

var SearchAction = {
	search: function(){
		AppDispatcher.dispatch({
			actionType: 'search',
			text: ''
		});
	},
	query: function(query){
		AppDispatcher.dispatch({
			actionType: 'query',
			text: query
		});
	}
};

module.exports = SearchAction;