'use strict';

const controller =  require('../controller/productController.js');

module.exports = function(app) {
  // product routes
  // fetch product route
  app.route('/api/product/')
    .get(controller._getProduct)

  app.route('/api/product/')
    .put(controller._updateProduct)

};