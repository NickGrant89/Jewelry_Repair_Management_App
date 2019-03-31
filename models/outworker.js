const mongoose = require('mongoose');

// User schema

const OutworkerSchema = mongoose.Schema({
       
    companyname:{
        type: String
    },
    name:{
        title: {type: String},
        firstname: {type: String},
        lastname: {type: String},
    },
    email:{
        type: String
    },
    phonenumber:{
        phone: {type: String},
        mobile: {type: String},
        work: {type: String},
    },
    //internal use
    company:{
        type: String
    },
    //internal use
    site:{
        type: String
    },
    address:{
        streetaddress: {type: String},
        streetaddress2: {type: String},
        city: {type: String},
        county: {type: String},
        postcode: {type: String},
        country: {type: String},
    },

});

let Outworker = module.exports = mongoose.model('Outworker', OutworkerSchema);