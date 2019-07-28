// API repairs Functions
const express = require('express');
const router = express.Router();
const Joi = require('joi');  // Joi is a validator, making code smaller//
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    
    destination: function(req, file, cb){
        //User.findById(req.user._id, function(err, user){
            cb(null, './uploads/');
        //});
    },
    filename: function(req, file, cb ){
        cb(null, new Date().toISOString() + file.originalname);
    }

});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({storage: storage, limits:{
        fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
});

// Import repair Model
let Repair = require('../models/repair');

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

router.post('/', checkAuth, upload.array('repairImages', 12), (req, res) => {
    /* const {error} = validaterepair(req.body);

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    }  */
    //console.log(req.files);
    var array = [];
    for (var i in req.files) {
        val = req.files[i];
        array.push(val.path);
        //console.log(val.path);
      }
      //console.log(array);
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
    repair.itemstorage = req.body.itemstorage;
    repair.repiarstatus = req.body.repiarstatus;
    repair.images = req.body.images;
    repair.company = req.body.company;
    repair.site = req.body.site;
    repair.repairImages = array;
    
    repair.outworkers = req.body.outworkers;
    repair.customer = req.body.customer;

    repair.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(repair);
            //console.log(req.files.path);
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
    repair.itemstorage = req.body.itemstorage;
    repair.repiarstatus = req.body.repiarstatus;
    repair.images = req.files.images;

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