// API Devices Functions
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkcustomer = require('../middleware/check-company');
const of = require('../middleware/onec-functions');

// Import Device Model


let Site = require('../models/site');



let User = require('../models/user');

//GET Method for all customer 

router.get('/', (req, res) => {
    Customer.find({}, function(err, customer){
        if(err){
            console.log(err)
        }else{
            //res.send(devices);
            res.json({
                customer
            })
            //console.log(customer);
        }
    }); 
});

//GET single customer

router.get('/:id', (req, res) => {
    
    Customer.findById(req.params.id, function(err, customer){
        if(err){
            res.send(err);
        }
        if(!customer) return res.status(404).send('The customer with the given ID cannot be found!'), console.log('ID not found!')
        res.json({
            customer: customer, 
        });
    });
    
}); 


//POST to add customer

router.post('/', (req, res) => {
    //const {error} = of.validatecustomer(req.body);
    //const auth = req.headers.authorization.split(" ")[1];

    /* if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    }  */

    let customer = new Customer();
    customer.name = req.body.name;
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
    customer.email = req.body.email;
    customer.phonenumber = req.body.phonenumber;
        customer.phone = req.body.phone;
        customer.mobile = req.body.mobile;
        customer.work = req.body.work;
    customer.company = req.body.company;
    customer.site = req.body.site;
    customer.address = req.body.address;
    customer.city = req.body.city;
    customer.county = req.body.county;
    customer.postcode = req.body.postcode;
    customer.country = req.body.county;

    customer.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(customer);
            console.log(customer , ' Created 200');
        };

    });
});

//PUT Method update single customer

router.put('/:id', (req, res) => {
    Customer.findById(req.params.id, function(err, customer){
        //if(!customer) return res.status('404').send('The customer with the given ID cannot be found!'), console.log('ID not found!')

        //const {error} = of.validatecustomer(req.body);

        //if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);

        customer.name = req.body.name;
            customer.firstname = req.body.firstname;
            customer.lastname = req.body.lastname;
        customer.email = req.body.email;
        customer.phonenumber = req.body.phonenumber;
            customer.phone = req.body.phone;
            customer.mobile = req.body.mobile;
            customer.work = req.body.work;
        customer.company = req.body.company;
        customer.site = req.body.site;
        customer.address = req.body.address;
        customer.city = req.body.city;
        customer.county = req.body.county;
        customer.postcode = req.body.postcode;
        customer.country = req.body.county; 

        customer.save();
        res.send(customer);
        console.log(customer, 'Updated 200!');
    });
});



//DEL Method customer

router.delete('/:id', (req, res) => {
        Customer.findById(req.params.id, function(err, customer){
            if(!customer) return res.status(404).send('The customer with the given ID cannot be found!'), console.log('ID not found!')

            customer.remove(customer._id);

            res.send(customer + 'Delete 200');
            console.log(customer, 'Delete 200 ');
        });
    });


module.exports = router;