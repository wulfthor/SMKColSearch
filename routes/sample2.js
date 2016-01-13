var express = require('express');
var app = express();
var async = require('async');

app.get('/', function(req, res){
    res.send('Hello World');
    });

var templateGenerateFunction = function(user,callback){
  // write your logic here , lets assume that your result is stored in a variable
  //you pass that in callback and also the email, because you need the email in later function
  callback(null,template,email);
}// end templateGenerate Function

var subjectFetchFunction = function(template,email,callback){
  // write your logic here and pass the finalTemplate and email in the callback
  callback(null,template,email);
} // end subject fetch function

var mailSendFunction = function (template,email,callback){
  // now that your mail has been sent, you can pass a success message
  //note : this is the last function, there can be only one non-error argument here, not more that that
  callback(null,"done");
}//end mailSendFunction

var completeMailFunction = function(user,callback){

  var myDummyFunction = function(callback){
    // first function has to be dummy here, because first function in async can't have arguments
    // and also because you have to pass the user in rest of functions which is a variable
    callback(null,user);
  }
  async.waterfall([templateGenerateFunction,subjectFetchFunction,mailSendFunction],function(err,result){
      if(err){
        callback(err,null)
      // callback because we have to still use it in other function
      }
      else{
        callback(null,result)
      }
  }); //end waterfall
}// end complete mail function
var CTAFunction = function(usersArray){
  async.map(usersArray,completeMailFunction,function(err,result){
      if(err){
        console.log(err)
        return err;
      }
      else {
        console.log("success");
        return "success"
      }
  })
}// end main CTA function
app.listen(80);
