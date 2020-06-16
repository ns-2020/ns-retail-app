'use strict';
const axios = require('axios');

//function code to handle api call via axios..
exports._handleApiCall = async function (params, api_name) {

    console.log('calling api : ' + api_name + ' api...', params);

    let api_response = await axios(params);

    console.log('response received from api server : ' + api_name + ' api...', api_response.data);

    if (api_response && api_response.data && api_response.data.error) {      
        console.log('Error occured from : ' + api_name + ' : ', api_response.data.error);
        return {error : api_response.data.error, result: null, message : api_response.data.message};
    } 

    if (api_response && api_response.data && api_response.data) {
        return {success : true, error:null, data:api_response.data, message: api_response.data.message, status: api_response.status, statusText: api_response.statusText};
    } else {
        return {success : true, error : null, data: api_response.data};
    }
}

//function code to handle api exceptions..
exports._handleCatchException = async function (err, api_name){
    console.log('Error occured from : ' + api_name + ' : ', err.message);
    let msg = err && err.message ? err.message : JSON.stringify(err);
    return {success : false, data: null, status: err.response.status, statusText: err.response.statusText, error:{message : msg}};
}