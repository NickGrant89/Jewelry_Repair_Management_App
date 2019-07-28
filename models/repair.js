const mongoose = require('mongoose');

// Repairs schema

const AddCustomerSchema = mongoose.Schema({   
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

const AddOutworkerSchema = mongoose.Schema({
       
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

const RepairSchema = mongoose.Schema({
    
    ticketno:{
        type: String,
        required: false
    },
    category:{
        type: String,
        required: false
    },
    decription:{
        type: String,
        required: false
    },
    condition:{
        type: String,
        required: false
    },
    price:{
        invat: {type: String, default: 'Unknown'},
        vatrate: {type: String, default: 'Unknown'},
        type: {type: String, default: 'Unknown'},
        deposit: {type: String, default: 'Unknown'},
        agreedvalue: {type: String, default: 'Unknown'},
        referance: {type: String, default: 'Unknown'},
    },    
    daterecevied:{
        type: String
    },
    itemstorage:{
        type: String
    },
    repairstatus:{
        type: String
    },
    images:{
        type: String
    },
    datecreated:{
        type: Date,
       default: Date.now
    },
    //device name
    deviceid:{
        type: String, 
    },
    //internal use
    company:{
        type: String
    },
    //internal use
    site:{
        type: String
    },
    customer:{ type: mongoose.Schema.Types.ObjectId, ref: 'AddCustomer'},
    outworkers:{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOutworker'},
});

let Repair = module.exports = mongoose.model('Repair', RepairSchema);
const AddCustomer = mongoose.model('AddCustomer', AddCustomerSchema);
const AddOutworker = mongoose.model('AddOutworker', AddOutworkerSchema);
