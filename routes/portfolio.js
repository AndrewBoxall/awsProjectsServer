var express = require('express');
var path = require('path');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('path1: ' + req.originalUrl);
  
  res.sendFile(path.join(__dirname, '../public/portfolio/build', 'index.html'));
});

/* GET static files. */
router.get('portfolio/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/portfolio/build/index.html'));
});

/* POST send email. */
router.post('/email', function(req, res, next) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: req.config.emailusername,
      pass: req.config.emailpassword
    }
  });

  let mailOptions = {
    from: req.config.emailusername, // sender address
    to: req.config.emailusername, // list of receivers
    subject: req.body.emailAddress + " Subject: " + req.body.emailSubject, // Subject line
    text: req.body.emailBody, // plain text body
    html: "<b>" + req.body.emailBody + "<br /><br />Regards,<br />" + req.body.senderName + "</b>" // html body
  };
  //send mail with defined transport object
  transporter.sendMail(mailOptions)
  //next();
  res.sendStatus(200);
});

module.exports = router;
