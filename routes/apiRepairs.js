// API repairs Functions
const express = require('express');
const router = express.Router();
const Joi = require('joi');  // Joi is a validator, making code smaller//
const checkAuth = require('../middleware/check-auth');

// Import repair Model
let Repair = require('../models/repair');

let Outworker = require('../models/outworker');

//GET Get all repairs

router.get('/', (req, res) => {
    Repair.find({}, function(err, repair){
        if(err){
            console.log(err)
        }else{
            //res.send(repairs);
            res.json({
                repair
            })
            console.log(repair);
        }

    });
});

//GET Display single repair by ID

router.get('/:id', (req, res) => {
    Repair.findById(req.params.id, function(err, repair){
        if(!repair) return res.status(404).send('The repair with the given ID cannot be found!'), console.log('ID not found!')
            res.send(repair);     
        });  
});

//POST to add a repair

router.post('/', (req, res) => {
    /* const {error} = validaterepair(req.body);

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    }  */

    let repair = new Repair();
    repair.ticketno = req.body.ticketno;
    repair.category = req.body.category;
    repair.decription = req.body.decription;
    repair.condition = req.body.condition;
    repair.price = req.body.price;
        repair.invat = req.body.invat;
        repair.vatrate = req.body.vatrate;
        repair.type = req.body.type;
        repair.deposit = req.body.deposit;
        repair.agreedvalue = req.body.agreedvale;
        repair.referance = req.body.referance;
    repair.daterecevied = req.body.daterecevied;
    repair.itemstorage = req.body.itemstorage;
    repair.repiarstatus = req.body.repiarstatus;
    repair.images = req.body.images;
    repair.company = req.body.company;
    repair.site = req.body.site;
    repair.outworkers = req.body.outworkers;
    repair.customer = req.body.customer;
    
    repair.customer = req.body.customer;

    repair.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(repair);
            console.log(repair , ' Created 200');
        };

    });
});

//PUT update a repair

router.put('/:id', (req, res) => {
    Repair.findById(req.params.id, function(err, repair){
        if(!repair) return res.status('404').send('The repair with the given ID cannot be found!'), console.log('ID not found!')

        //const {error} = validaterepair(req.body);

        //if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);

        repair.ticketno = req.body.ticketno;
    repair.category = req.body.category;
    repair.decription = req.body.decription;
    repair.condition = req.body.condition;
    repair.price = req.body.price;
        repair.invat = req.body.invat;
        repair.vatrate = req.body.vatrate;
        repair.type = req.body.type;
        repair.deposit = req.body.deposit;
        repair.agreedvalue = req.body.agreedvale;
        repair.referance = req.body.referance;
    repair.daterecevied = req.body.daterecevied;
    repair.itemstorage = req.body.itemstorage;
    repair.repiarstatus = req.body.repiarstatus;
    repair.images = req.body.images;
    repair.company = req.body.company;
    repair.site = req.body.site;
    repair.outworkers = req.body.outworkers;
    repair.customer = req.body.customer;

        repair.save();
        res.send(repair);
        console.log(repair, 'Updated 200!');
    });
});

//DEL Delete repair

router.delete('/:id', (req, res) => {
    Repair.findById(req.params.id, function(err, repair){
        if(!repair) return res.status(404).send('The repair with the given ID cannot be found!'), console.log('ID not found!')

        repair.remove(repair._id);

        res.send(repair + 'Delete 200');
        console.log(repair, 'Delete 200 ');
    });
});

module.exports = router;