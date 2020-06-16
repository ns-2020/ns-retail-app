'use strict';

const api = require('../api/targetApi.js');
const moment_timezone = require('moment-timezone');

exports._getProduct = async function (req, res) {   

    try {

    	// basic param validation 
        if (!req || !req.query || !req.query.id) {
            res.send({success : false, error :{ statusCode : 400, message : 'Bad Request', errText : 'Product id missing.'}, data : null})
            return
        }

        const productid = req.query.id;
        
        let response = await api._fetchProductById(productid);

        if (response && response.data && !response.data.product) {
            res.send({success : false, error :{ statusCode : 400, message : 'Bad Request', errText : 'Product id missing.'}, data : null})
            return
        }

        let data = {
            'product_id' :  response['data']['product']['item']['tcin'],
            'product_name' :  response['data']['product']['item']['product_description']['title'],
            'product_url' :  response['data']['product']['item']['buy_url']
        }

        response['data']['product'] = data;

        res.send(response)

    } catch (err) {
    	console.log('err', err);
    }

};

exports._updateProduct = async function (req, res) {   

    try {

        // console.log(req)

        res.send({success : true})
        // let response = await api._fetchProductById(params, 'get_product');

    } catch (err) {
        console.log('err', err);
    }

};