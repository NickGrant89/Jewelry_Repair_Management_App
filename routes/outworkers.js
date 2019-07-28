const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/login-auth');

//company Model
let Company = require('../models/company');

let Site = require('../models/site');


let User = require('../models/user');

let Outworker = require('../models/outworker');

let Repair = require('../models/repair');

//GET all outworkers .
router.get('/', ensureAuthenticated, function(req, res){
    Company.find({}, function(err, companies){
    User.findById(req.user.id, function(err, user){
        if(err){res.redirect('/');}
        /* if(user.admin == 'Super Admin'){
            return res.redirect('/admin/companies')
        } */
        if(user.admin == 'Admin' || 'User'){
            Outworker.find({}, function(err, outworkers){
                if(err){
                    console.log(err)
                }else{
                    res.render('outworkers', {
                        title:'Outworkers',
                        outworkers: outworkers,
                        companies:companies,
                    });
                }
            });
        }
    });
});
});

//Get single Outworker page

router.get('/:id', ensureAuthenticated, (req, res) => {
    Company.find({}, function(err, companies){
        Outworker.findById(req.params.id, function(err, outworker){
            User.findById(req.user.id, function(err, user){
                if(err){res.redirect('/')};
                if(user.admin == 'Admin' || 'User'){
                    //console.log(q);
                    if(err){
                        console.log(err)
                    }else{
                        res.render('outworker', {
                            title: outworker.companyname,
                            companies:companies,
                            outworker: outworker,
                            
                        }); 
                    }
                }
            });
        });
    });
});

//Add outworker

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', ensureAuthenticated, [
    //Name
    check('name').isLength({min:3}).trim().withMessage('PC Name required'),
    //Company
    check('email').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('address').isLength({ min: 3}),
    // username must be an email
    check('postcode').isLength({min:3}).trim().withMessage('Company Name required'),
    // username must be an email
    check('country').isLength({min:3}).trim().withMessage('Company Name required'),

    check('phone').isLength({min:3}).trim().withMessage('Company Name required'),

], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/');

   return { errors: errors.mapped() };
  }
  let company = new Company();
    company.name = req.body.name;
    company.email = req.body.email;
    company.address = req.body.address;
    company.city = req.body.city;
    company.county = req.body.county;
    company.postcode = req.body.postcode;
    company.country = req.body.county;
    company.phone = req.body.phone;
    company.mobile = req.body.mobile;

  company.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Company Added')
           res.redirect('/companies')
        }
    });

});




module.exports = router;