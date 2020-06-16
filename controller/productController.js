'use strict';

const api = require('../api/targetApi.js');
const model = require('../model/model.js');
const config = require('../config/constants.js');
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
            res.send({success : false, error :{ statusCode : 404, message : 'Bad Request', errText : 'Product id missing.'}, data : null})
            return
        }

        let pricingRes = await model._fetchProductPricing(productid);

        if (pricingRes && pricingRes.error) {
            res.send({success : false, error :{ statusCode : 404, message : 'Bad Request', errText : 'Product pricing id missing.'}, data : null})
            return
        }

        let data = {
            'id' :  response['data']['product']['item']['tcin'],
            'name' :  response['data']['product']['item']['product_description']['title'],
            'url' :  response['data']['product']['item']['buy_url'],
            'current_price' : {
                "value" : pricingRes['data']['price'],
                "currency_code" : pricingRes['data']['currency'],
            }
        }

        response['data']['product'] = data;

        res.send(response)

    } catch (err) {
    	console.log('err', err);
    }

};

exports._updateProduct = async function (req, res) {   

    try {

        // basic param validation 
        if (!req || !req.query || !req.query.id) {
            res.send({success : false, error :{ statusCode : 400, message : 'Bad Request', statusText : 'Product id missing.'}, data : null})
            return
        }

        if (!req.body || !req.body.price) {
            res.send({success : false, error :{ statusCode : 400, message : 'Bad Request', statusText : 'Product Pricing is not provided/or invalid.'}, data : null})
            return
        }

        if (!req.body || !req.body.secret || req.body.secret !== config.secret) {
            res.send({success : false, error :{ statusCode : 401, message : 'Bad Request', statusText : 'Authentication failed, please provide valid token.'}, data : null})
            return
        }

        let param = {
            'id' : req.query.id,
            'price' : req.body.price
        }

        let response = await model._updateProductPricing(param, '_updateProduct');

        if (response.error) {
            res.send({success : false, error :{ statusCode : 404, message : 'Not Found', statusText : "Provided product id doesn't exist."}, data : null})
            return           
        }

        res.send({success : true, error : null, data: {message : 'Product pricing updated successfully.'}})

    } catch (err) {
        console.log('err', err);
    }

};