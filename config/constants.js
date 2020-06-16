'use strict';

module.exports = Object.freeze({
	'target' : {
		'baseURL' : 'http://redsky.target.com/v2/pdp/tcin/',
		'fieldsExcluded' : 'circle_offers,available_to_promise_network,taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics',
	},
	'secret' : 'ns-retail-token-001',
	'db' : {
		'url' : 'mongodb+srv://neha3107:O7mg3MVDryBOO4Ff@cluster0-ns-dev-zfypf.mongodb.net/?retryWrites=true&w=majority'
	}
});