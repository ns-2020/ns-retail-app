'use strict';

const config = require('../config/constants.js');
const utils = require('../utils/generic.js');

exports._fetchProductById = async function (productid) {   

    try {

        let params = {
            url: config.target.baseURL + productid,
            method: 'GET',
            params: {
            	'excludes' : config.target.fieldsExcluded // fields to be excluded in redsky rest api
            }
        };

        return await utils._handleApiCall(params, '_fetchProductById');

    } catch (err) {
    	console.log('err', err);
    	return await utils._handleCatchException(err, '_fetchProductById');
    }

};