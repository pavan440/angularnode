var express = require('express');
var router = express.Router();
var Message= require('../models/message');
var User=require('../models/user');
var messageController=require('../controllers/messagecontroller.js');
var mongoose = require('mongoose');
var knox=require('knox');
var fs=require('fs');
var formidable=require('formidable');
var os=require('os');
var User= require('../models/user');
var sharp=require('sharp');
var knoxClient=knox.createClient({
    key:"",
    secret:"",
    bucket:"xxxxxmedia449"
});

router.get('/:id',function(req,res,next){
    console.log("am in get functio retreiving messages");
    var id =req.params.id;
    console.log(id=='null');
    if(id=='null'){
        res.status(401).json({
            message:'login',
            obj:null
        })
    }
    else{
    console.log(req.params.id);
    var i=0;
    messageController.getMessages(req.params.id,function(err,messages){
        console.log("am executed");
       i++;
        if(err){
             return res.status(500).json({
                tittle:'An error occured fuck you',
                error:err
                
            });
            
        }
        console.log("am inside message route");
       console.log(i);
        res.status(201).json({
            message:'Success',
            obj:messages
        });
    });
    
}});

router.post('/savefile', function (req, res, next) {
   
   console.log("am executed on server");
   var message;
   //var response1=require("response");
   //console.log(message);
    function generateType(filename){
       var ext_regex=/(?:\.([^.]+))?$/;
       var ext=ext_regex.exec(filename)[0];
       return ext;
   }
   function generateFilename(filename){
       var ext_regex=/(?:\.([^.]+))?$/;
       var ext=ext_regex.exec(filename)[1];
       var date=new Date().getTime();
       var charBank="abcdefghijklmnopqrstuvwxyz";
       var fstring='';
       for(var i=0;i<15;i++){
           fstring+=charBank[parseInt(Math.random()*26)];
       }
       return (fstring+=date+'.'+ext);
   }
   
   var tmpFile,nfile,fname,type,userId,content;
   
   var newForm=new formidable.IncomingForm();
    newForm.keepExtensions=true;
    newForm.parse(req,function(err,fields,files){
        console.log(fields);
        console.log(fields.userfile);
        console.log(fields.content);
        content=fields.content;
        console.log(fields.userId);
        userId=fields.userId;
        console.log(files);
        if(err){
            console.log(err);
        }
        if(files.userfile.path){
        tmpFile=files.userfile.path;
        fname=generateFilename(files.userfile.name);
        type=generateType(files.userfile.name);
        nfile=os.tmpDir()+'/'+fname;
        
        }
        //res.filename1=fname;
       // res.type1=type;
       
    });
    newForm.on('end',function(){
             if(tmpFile){
            sharp(tmpFile).resize(200, 300, {kernel: sharp.kernel.nearest}).toFile(nfile).then(function() {
                 fs.readFile(nfile,function(err,buf){
                     if(err){
                         console.log("error while reading file"+err);
                     }
                     console.log("reading the resized file");
                     console.log("buf.lenght"+buf.length);
                     var req=knoxClient.put(fname,{
                         'Content-Length':buf.length,
                         'Content-Type': 'image/jpeg'
                     });
                     req.on('response',function(response){
                         console.log("response is"+response);
                        // console.log(res.json());
                        //response.redirect();
                         console.log(response.statusCode);
                         if(response.statusCode==200){
                             //console.log(response.getheaders());
                             //console.log(fields.message.content);
                             //console.log(res);
                            //console.log(res.filename1);
                            User.findById(userId,function(err,user){
                                if(err){
                                    console.log("error");
                                    console.log(err);
                                  return res.status(500).json({
                                result:"sucess"
                                 });
                                }
                                message=new Message({
                                content:content,
                                user:userId,
                                filename:fname,
                                type:type,
                                username:user.firstname
                                    });
                                 message.save(function(err,result){
                                console.log("saving the data");
                                if(err){
                                    console.log("error");
                                    console.log(err);
                                  return res.status(500).json({
                                result:"sucess"
                                 });  
                                }
                                console.log('sucess');
                                return res.status(200).json({
                                result:{
                                    id:result._id,
                                    content:result.content,
                                    userId:result.user,
                                    username:result.username,
                                    filename:result.filename,
                                    type:result.type
                                    
                                }
                            }); 
                            });
                            });
                           
                           /* return res.status(200).json({
                                result:"sucess"
                            });*/
                         }
                     });
                     req.end(buf);
                     });
                 });
            
             }
});
});
router.post('/',function(req,res,next){
    //console.log(req.body.message);
    console.log(req.body.content);
    console.log(req.body.userId);
    var messagesent=req.body.message;
    console.log(messagesent);
    User.findById(req.body.userId,function(err,user){
        if(err){
            return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
           
        }
        var message=new Message({
       content:req.body.content,
       user:req.body.userId,
       username:user.firstname,
       filename:null
       
   });
   message.save(function(err,result){
       if(err){
           return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
           
       }
       console.log("after message saved");
       console.log(result);
       
        res.status(201).json({
            result:{
                                    id:result._id,
                                    content:result.content,
                                    userId:result.user,
                                    username:result.username,
                                    filename:result.filename,
                                    type:result.type
                                    
                                }
       });
   });
   
    });
    
    
    
});

router.patch('/:id',function(req,res,next){
    console.log("executing the patchs method");
    
    Message.findById(req.params.id,function(err,message){
        if(err){
            return res.status(500).json({
                tittle:'An error occured fuck you',
                error:err
                
            });
        }
        if(!message){
            return res.status(500).json({
                tittle:'No message found',
                error:{message:'Message Not Found'}
                
            });
        }
       // console.log(message.conetent);
        console.log("request content is"+req.body.content);
        message.content=req.body.content;
       message.save(function(err,result){
            console.log("message content is ");
            console.log(message.content);
            if(err){
            return res.status(500).json({
                tittle:'An error occured fuck you',
                error:err
                
            });
        }
        res.status(250).json({
             result:{
                                    id:result._id,
                                    content:result.content,
                                    userId:result.user,
                                    username:result.username,
                                    filename:result.filename,
                                    type:result.type
                                    
                                }
        });
        console.log(result);
        });
    });
});
router.patch('/withfile/:id',function(req,res,next){
    console.log("executing the patch method");
     function generateType(filename){
       var ext_regex=/(?:\.([^.]+))?$/;
       var ext=ext_regex.exec(filename)[0];
       return ext;
   }
   function generateFilename(filename){
       var ext_regex=/(?:\.([^.]+))?$/;
       var ext=ext_regex.exec(filename)[1];
       var date=new Date().getTime();
       var charBank="abcdefghijklmnopqrstuvwxyz";
       var fstring='';
       for(var i=0;i<15;i++){
           fstring+=charBank[parseInt(Math.random()*26)];
       }
       return (fstring+=date+'.'+ext);
   }
   
   var tmpFile,nfile,fname,type,userId,content,username;
   var id=req.params.id;
   console.log(id);
   var newForm=new formidable.IncomingForm();
    newForm.keepExtensions=true;
    newForm.parse(req,function(err,fields,files){
        console.log(fields);
        console.log(fields.userfile);
        console.log(fields.content);
        content=fields.content;
        console.log(fields.userId);
        userId=fields.userId;
        console.log(fields.username);
        username=fields.username;
        console.log(files);
        if(err){
            console.log(err);
        }
        if(files.userfile.path){
        tmpFile=files.userfile.path;
        fname=generateFilename(files.userfile.name);
        type=generateType(files.userfile.name);
        nfile=os.tmpDir()+'/'+fname;
        
        }
        //res.filename1=fname;
       // res.type1=type;
       
    });
     newForm.on('end',function(){
             if(tmpFile){
            sharp(tmpFile).resize(200, 300, {kernel: sharp.kernel.nearest}).toFile(nfile).then(function() {
                 fs.readFile(nfile,function(err,buf){
                     if(err){
                         console.log("error while reading file"+err);
                     }
                     console.log("reading the resized file");
                     console.log("buf.lenght"+buf.length);
                     var req=knoxClient.put(fname,{
                         'Content-Length':buf.length,
                         'Content-Type': 'image/jpeg'
                     });
                     req.on('response',function(response){
                         console.log("response is"+response);
                        // console.log(res.json());
                        //response.redirect();
                         console.log(response.statusCode);
                         if(response.statusCode==200){
                             //console.log(response.getheaders());
                             //console.log(fields.message.content);
                             //console.log(res);
                            //console.log(res.filename1);
                            
                                    Message.findById(id,function(err,message){
                                     if(err){
                                    return res.status(500).json({
                                    tittle:'An error occured fuck you',
                                    error:err
                
                                    });
                                }
                                if(!message){
                                    return res.status(500).json({
                                    tittle:'No message found',
                                    error:{message:'Message Not Found'}
                        
                                    });
                                    }
       //                       console.log(message.conetent);
                               // console.log("request content is"+req.body.content);
                                message.content=content;
                                message.filename=fname;
                                message.type=type;
                                message.user=userId;
                                message.username=username;
                                console.log(message);
                                message.save(function(err,result){
                                 console.log("message content is ");
                                console.log(message.content);
                                
                                if(err){
                                return res.status(500).json({
                                tittle:'An error occured fuck you',
                                error:err
                
                            });
                            }
                            console.log(result);
                           return  res.status(250).json({
                             result:{
                                    id:result._id,
                                    content:result.content,
                                    userId:result.user,
                                    username:result.username,
                                    filename:result.filename,
                                    type:result.type
                                    
                                }
                                
                                });
                            
                                });
                                });
                           
                           /* return res.status(200).json({
                                result:"sucess"
                            });*/
                         }
                     });
                     req.end(buf);
                     });
                 });
            
             }
});
    
});


router.delete('/:id',function(req,res,next){
    console.log("executing the delete method");
    Message.findById(req.params.id,function(err,message){
        if(err){
            return res.status(500).json({
                tittle:'An error occured fuck you',
                error:err
                
            });
        }
        if(!message){
            return res.status(500).json({
                tittle:'No message found',
                error:{message:'Message Not Found'}
                
            });
        }
        //console.log(message.conetent);
        //console.log("request content is"+req.body.content);
        message.remove(function(err,result){
            console.log("message content is ");
            console.log(message.content);
            if(err){
            return res.status(500).json({
                tittle:'An error occured fuck you',
                error:err
                
            });
        }
        res.status(250).json({
                              result:{
                                    id:result._id,
                                    content:result.content,
                                    userId:result.user,
                                    username:result.username,
                                    filename:result.filename,
                                    type:result.type
                                    
                                }
                                
        });
        console.log(result);
        });
    });
});
module.exports = router;
