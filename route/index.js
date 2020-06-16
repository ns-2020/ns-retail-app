'use strict';

const controller =  require('../controller/productController.js');
const path = require('path');

module.exports = function(app) {

  	app.route('/*', (req, res) => {
	  res.sendFile(path.join(__dirname, '../build', 'index.html'));
	});
	// product routes
	// fetch product route
  	app.route('/api/product/')
    	.get(controller._getProduct)

  	app.route('/api/product/')
    	.put(controller._updateProduct)

};