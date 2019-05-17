// API Devices Functions
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const of = require('../middleware/onec-functions');

// Import Device Model
let outworker = require('../models/outworker');

let Site = require('../models/site');

let User = require('../models/user');

let Outworker = require('../models/outworker');


//GET all outworkers by outworker

router.get('/', (req, res) => {
    //console.log(of.ifSuperAdmin(req.params.id));
    Outworker.find({}, function(err, outworker){
        if(err){
            console.log(err)
        }else{
            //res.send(devices);
            res.json({
                outworker
            })
            //console.log(outworker);
        }
    }); 
});


//GET Singel Ourworker :

router.get('/:id', (req, res) => {
    
    Outworker.findById(req.params.id, function(err, outworker){
        if(err){
            res.send(err);
        }
        const query = {'outworker': outworker.name};
            Site.find(query, function(err, site){
                Device.find(query, function(err, device){
                    if(!outworker) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
                    res.json({
                        outworker: outworker,
                        sites: site,
                        devices: device
                        
                    });
                });
            }); 
        });
    }); 


//POST to add Outworker

router.post('/', (req, res) => {
   /*  const {error} = of.validateoutworker(req.body);
    const auth = req.headers.authorization.split(" ")[1];

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    }  */

    let outworker = new Outworker();
    outworker.companyname = req.body.companyname;
    outworker.name = req.body.name;
        outworker.firstname = req.body.firstname;
        outworker.lastname = req.body.lastname;
    outworker.email = req.body.email;
    outworker.phonenumber = req.body.phonenumber;
        outworker.phone = req.body.phone;
        outworker.mobile = req.body.mobile;
        outworker.work = req.body.work;
    outworker.company = req.body.company;
    outworker.site = req.body.site;
    outworker.address = req.body.address;
    outworker.city = req.body.city;
    outworker.county = req.body.county;
    outworker.postcode = req.body.postcode;
    outworker.country = req.body.county; 


    outworker.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(outworker);
            console.log(outworker , ' Created 200');
        };

    });
});

//PUT update outworker by ID

router.put('/:id', (req, res) => {
    Outworker.findById(req.params.id, function(err, outworker){
        if(!outworker) return res.status('404').send('The outworker with the given ID cannot be found!'), console.log('ID not found!')

        /* const {error} = of.validateoutworker(req.body);

        if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message); */

        outworker.companyname = req.body.companyname;
        outworker.name = req.body.name;
            outworker.firstname = req.body.firstname;
            outworker.lastname = req.body.lastname;
        outworker.email = req.body.email;
        outworker.phonenumber = req.body.phonenumber;
            outworker.phone = req.body.phone;
            outworker.mobile = req.body.mobile;
            outworker.work = req.body.work;
        outworker.company = req.body.company;
        outworker.site = req.body.site;
        outworker.address = req.body.address;
        outworker.city = req.body.city;
        outworker.county = req.body.county;
        outworker.postcode = req.body.postcode;
        outworker.country = req.body.county;  

        outworker.save();
        res.send(outworker);
        console.log(outworker, 'Updated 200!');
    });
});



//DEL Method Outworker

router.delete('/:id', (req, res) => {
        Outworker.findById(req.params.id, function(err, outworker){
            if(!outworker) return res.status(404).send('The outworker with the given ID cannot be found!'), console.log('ID not found!')

            outworker.remove(outworker._id);

            res.send(outworker + 'Delete 200');
            console.log(outworker, 'Delete 200 ');
        });
    });


module.exports = router;