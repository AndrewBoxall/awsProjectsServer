var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../mongoSchema/product');

/* GET store products from mongoDB. */
router.get('/categories/*', function(req, res, next) {
  var connectionString;
  connectionString = `mongodb+srv://${req.config.mongousername}:${req.config.mongopassword}@cluster0-gbspm.mongodb.net/lamode?retryWrites=true`;
  mongoose
    .connect(connectionString, { useNewUrlParser: true} )
    .then(() => {

      var pathArray = req.path.split('/');

      if (typeof pathArray[4] === 'undefined'){
        if (typeof pathArray[3] === 'undefined') {
          pathArray[3] = {$exists: true};
        }
        
        if (pathArray[2] == 'all') {
          pathArray[2] = {$exists: true};
        }
        
        Product.find({category: pathArray[2], subcategory: pathArray[3]}, function(err, productData){
          if(err){ console.log('hit an error' + err)}
          res.status(200).send(productData);
        });
      } else {
        Product.findOne({link: pathArray[4]}, function(err, productData){
          res.status(200).send(productData);
        });
      }
    },
    err => { mongoose.disconnect(); }
  )
  }
);

/* GET session token. */
router.get('/requestSession', (req, res, next) => {
  res.status(200).send('some token');
});

/* POST shipping and billing info. */
router.post('/submitShippingBillingInfo', (req, res, next) => {
  res.status(200).send('shipping info recieved');
});

module.exports = router;