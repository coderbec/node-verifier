var express = require('express');
var app = express();
var speakeasy = require("speakeasy");
var sdk = require('messagemedia-messages-sdk');
var controller = sdk.MessagesController;
const ejs = require('ejs');
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));

sdk.Configuration.basicAuthUserName = process.env.KEY; 
sdk.Configuration.basicAuthPassword = process.env.SECRET; 

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var secret = speakeasy.generateSecret({length: 20});

app.get('/', function(req, res){
  res.render('index');
});

app.post("/register", urlencodedParser, function (req, res) {
  var token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32'
  });
  
  let body = new sdk.SendMessagesRequest();

  body.messages = [];
  body.messages[0] = new sdk.Message();

  body.messages[0].content = "Your MessageMedia security code is: "+token;
  body.messages[0].destinationNumber = req.body.mobile;
  body.messages[0].metadata = {"token": token};
  
  controller.sendMessages(body, function(error, response, context) {
    if (!error){

      var message = response.messages[0].messageId;
      console.log("message ID" + message);
      res.render("verify", {messageID: message});
    } else {
      res.send(error);
    }
  });
  
});

app.post("/verify", urlencodedParser, function (req, res) {
  var userCode = req.body.code;
  var messageId = req.body.messageID;

  var tokenValidates = false;

  controller.getMessageStatus(messageId, function(error, response, context) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
      var token = response.metadata.token;
      if (userCode == token ){
        tokenValidates = true;
      }
    }
    res.send(tokenValidates);
  });
  
});

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});