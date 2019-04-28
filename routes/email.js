var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET users listing. */
router.post('/', function(req, res, next) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "inquireabit@gmail.com",
      pass: "inquireabitwork"
    }
  });

  let mailOptions = {
    from: "inquireabit@gmail.com", // sender address
    to: "inquireabit@gmail.com", // list of receivers
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
