'use strict';

const config = require('../config/constants');
const {MongoClient} = require('mongodb');

async function establishDBConnection() {
	const url = config.db.url;

	try {

	   // Use connect method to connect to the Server
	    const client = new MongoClient(url);

		let db = await client.connect();

		return db;

	} catch (err) {
    	
    	console.log('err', err.message);
    	return {message: err, error : true};
    }
} 

function closeDBConnection(db) {
   db.close();
   console.log('connection closed successfully...')
} 

exports._updateProductPricing = async function(param) {

	const client = await establishDBConnection();

	if (client.error) {

		return client
	}

	const collection = await client.db('retailDB').collection('productpricing');

	const product = await collection.findOne({'productId': param.id});

	if (!product) {

		return {error : true, message : 'Product you are trying to update is invalid.'}
	}

	const res = await collection.updateOne({'productId': param.id}, { $set: {'price' : param.price, 'lastModified': new Date()} });

	await closeDBConnection(client);

	return {error : false, message : 'Product pricing updated successfully.'}
}

exports._fetchProductPricing = async function(id) {

	const client = await establishDBConnection();

	if (client.error) {

		return client
	}

	const collection = await client.db('retailDB').collection('productpricing');

	const product = await collection.findOne({'productId': id});

	if (!product) {

		return {error : true, message : "Product id doesn't exist."}
	}

	await closeDBConnection(client);

	return {error : false, message : 'Product pricing fetched successfully.', data : product}
}