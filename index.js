var express=require('express');
var app=express();
var nodemailer = require('nodemailer');
app.use(express.static(__dirname+'/views'));
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/',function(req,res){
console.log("hi there");
res.render("profile.ejs");
});

app.post('/contact', urlencodedParser, function (req, res) {
    //Prepare output in JSON format
   response = {
   
     name:req.body.fullname,
      email:req.body.email,
    comment: req.body.message
   };
   
   


var transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'your email',
    pass: 'your password'
  },
  tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'your email',
  to: 'reciever email',
  subject: 'Sending Email using Node.js',
  text: 'NAME : '+response.name+'- - EMAIL ADRESS OF SENDER : '+response.email+'- - COMMENT : ' +response.comment
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    //console.log(error);
  } else {
   // console.log('Email sent: ' + info.response);
  }
});





res.redirect('/');


  // res.end(JSON.stringify(response));
})



var server=app.listen(PORT,function(){
var host=server.address().port;
console.log("host"+host);
console.log("yes");
});