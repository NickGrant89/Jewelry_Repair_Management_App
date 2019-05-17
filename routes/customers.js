const express = require('express');
const router = express.Router();

//Access Control
const ensureAuthenticated = require('../middleware/login-auth');



let User = require('../models/user');

let Site = require('../models/site');

let Company = require('../models/company');

let Customer = require('../models/customer');


const of = require('../middleware/onec-functions');

//GET Display all Customers

router.get('/', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
    Customer.find({'company': user.company}, function(err, customers){
        Company.find({}, function(err, companies){
                if(err){res.redirect('/')};
                /* if(user.admin == 'Super Admin'){
                    return res.redirect('/admin/devices')
                } */
                    if(user.admin == 'Admin' || 'User'){
                        if(err){
                            console.log(err)
                        }else{
                            //console.log(devices)
                            res.render('customers', {
                                title:'Customers',
                                companies:companies,
                                customers:customers
                            });
                        }
                    }
            });
        });
    });
});

//Get single customer 

router.get('/:id', ensureAuthenticated, (req, res) => {
    Customer.findById(req.params.id, function(err, customer){
        User.findById(req.user.id, function(err, user){
            if(err){res.redirect('/')}
            if(user.admin == 'Admin' || 'User'){
                Site.find({'company': user.company}, function(err, sites){
                    Company.find({'name': user.company}, function(err, companies){
                        //console.log(type);
                        res.render('customer', {
                            sites: sites,
                            companies: companies,
                            title: customer.name.firstname,
                            customer:customer
                        });
                        //console.log(device);
                    
                    });
                });
            }
        });     
    });
});

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', ensureAuthenticated, [
    //Name
    check('pcname').isLength({min:3}).trim().withMessage('PC Name required'),
    //Company
    check('ipaddress').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('macaddress').isLength({ min: 6}),

], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/devices/add');

   return { errors: errors.mapped() };
  }
  let device = new Device();
  device.pcname = req.body.pcname;
  device.ipaddress = req.body.ipaddress;
  device.macaddress = req.body.macaddress;
  device.company = req.body.company;
  device.site = req.body.site;

  device.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Device Added')
           res.redirect('/devices')
       }
  });

});


//Edit customer
router.post('/edit/:id', ensureAuthenticated,  (req, res) => {
    let device = {};
    device.pcname = req.body.pcname;
    device.status = req.body.status;
    device.pcname = req.body.pcname;
    device.ipaddress = req.body.ipaddress;
    device.macaddress = req.body.macaddress;
    device.site = req.body.site;
    device.company = req.body.company;
  
    let query = {_id:req.params.id}

    Device.updateOne(query, device, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/devices')
         }
    });
    //console.log(req.body.pcname)
 });

/*  router.post('/settings/:id', ensureAuthenticated, (req, res) => {
    
    //console.log(req.body.ftStatus);
    function f(){
        if(req.body.ftStatus == 'true'){
            return true;
        }
        return false;
    }
    
    //console.log(hello(device));
    var settings = {
        deviceSettings: {
            fileTransfer: {
                type: req.body.type,
                path: req.body.path,
                ftStatus: f()
            }
        },
    }
    //console.log(settings);
    let query = {_id:req.params.id}

    Device.updateOne(query, settings, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/devices')
         }
    });
    //console.log()

 }); */

 //Delete customer
router.delete('/:id', ensureAuthenticated, (req, res) => {
    /* if(!req.user._id){
        res.status(500).send();
    } */

    let query = {_id:req.params.id}

    Device.findById(req.params.id, function(err, device){
        /* if(device.owner != req.user._id){
            res.status(500).send();
        }else{ */
            Device.deleteOne(query, function(err){
                if(err){
                    console.log(err)
                }
                res.send('Success');
            });
        //}
    });
});

module.exports = router;