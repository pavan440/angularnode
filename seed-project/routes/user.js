var express = require('express');
var router = express.Router();
var User= require('../models/user');
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');
var userController=require('../controllers/UserController');
router.post('/', function (req, res, next) {
    console.log("am inside user");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.email);
    console.log(req.body.password);
   var user=new User({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       password:bcrypt.hashSync(req.body.password,10),
       email:req.body.email
       
   });
   
   console.log("am executed on server");
   //console.log(message);
   user.save(function(err,result){
       if(err){
           return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
           
       }
        res.status(201).json({
           message:'saved message',
           obj:result
       });
   });
});
router.post('/sigin', function (req, res, next) {
    console.log("am in sigin");
    console.log(req.body.email);
    console.log(req.body.password);
    User.findOne({email:req.body.email},function(err,user){
        if(err){
           return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
           
       }
       if(!user){
          return res.status(401).json({
               tittle:'Login failed',
               error:{message:'invalid emailid'}
           }); 
       }
       if(!bcrypt.compareSync(req.body.password,user.password)){
           return res.status(401).json({
               tittle:'Login failed',
               error:{message:'invalid password'}
           });
       }
       var token=jwt.sign({user:user},'secret',{expiresIn:7200});
       res.status(200).json({
           message:'suceesfully logged in',
           token:token,
           userId:user._id
       });
        
    });
});
router.post('/addfriends', function (req, res, next){
    console.log("am in addmethod");
    console.log(req.body.userId);
    var id=req.body.userId;
    //var id="5b18778261cbd20bfaf9fc53";
    //var id = mongoose.Types.ObjectId(req.body.userId);
    
    User.findById(id,function(err,baseUser){
        if(err){
           return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
           
       }
       if(!baseUser){
          return res.status(401).json({
               tittle:'Login failed',
               error:{message:'invalid userid'}
           }); 
       }
       //user.friends.push("5b1606edda7cac0db795d6de");
       //console.log(baseUser.friends);
       var friendslist=new Array();
       if(baseUser.friends){
       friendslist=baseUser.friends;
       }
       console.log("printing friend list");
       //userfriend.forEach(friend=>console.log(friend));
       console.log("am in friends list");
       console.log(friendslist);
       var index=0;
       var addfriendslist=new Array();
       User.find({}, function(err, users) {
           if(err){
           return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
           
       }
       var friendslist1=new Array();
         users.forEach(user1=>{
             console.log(baseUser._id);
              friendslist1=user1.friends;
              console.log(friendslist1);
             if(!user1._id.equals(baseUser._id)){
                 var infriendslist
                 baseUser.friends.forEach(friend=>{
                      if(friend.equals(user1._id)) {
                          infriendslist=true;
                      }
                   });
                 if(infriendslist){
                     
                     console.log('--------');
                     console.log("you are in my friends list");
                     console.log(user1._id,user1.firstname);
                     console.log('-----');
                 }
             
             }
             
         });
         console.log("step0 before starting loop base user is");
         console.log(baseUser._id,baseUser.firstname);
           users.forEach(user1=>{
               console.log("step1:starting the loop for user");
               //console.log(user1);
               if(!user1._id.equals(baseUser._id)){
                   console.log("step2:am differen than the current user");
                   console.log(user1._id,user1.firstname);
                   var infriendslist;
                   baseUser.friends.forEach(friend=>{
                      if(friend.equals(user1._id)) {
                          infriendslist=true;
                      }
                   });
                   if(!infriendslist){
                           var requestStatus=null;
                          var sentStatus=null;
                          baseUser.receivedfriendrequests.forEach((receivedrequest)=>{
                       console.log("step3:checking if condition");
                       console.log(receivedrequest.fromFriend);
                       console.log(user1._id);
                       console.log(receivedrequest.fromFriend.equals(user1._id));
                       if(receivedrequest.fromFriend.equals(user1._id)){
                           requestStatus=receivedrequest.requeststatus;
                       }
                       
                   });
                   //console.log('user id in setting friends');
                   //console.log(user1._id);
                   baseUser.sentfriendrequests.forEach((sentfriendrequest)=>{
                       
                       console.log("step4 checking if condition");
                       console.log(sentfriendrequest.Tofriend);
                       console.log(user1._id);
                       console.log(sentfriendrequest.Tofriend.equals(user1._id));
                       //console.log(sentfriendrequest.Tofriend.includes(user1._id));
                       //console.log(sentfriendrequest);
                       if(sentfriendrequest.Tofriend.equals(user1._id)){
                           sentStatus=sentfriendrequest.requeststatus;
                           console.log("am printing sent status");
                           console.log(sentStatus);
                       }
                   });
                   addfriendslist[index]={id:user1._id,fname:user1.firstname,lname:user1.lastname,receivedrequest:requestStatus,sentrequest:sentStatus};
                   index++;
                       }
                   
               }//end of user id if
           });//end of for each
            res.status(200).json({
           addfriendslist:addfriendslist
           
       });
        
       });
       
       
    });
    
});
router.post('/addfriends/sentfriendrequest',function(req, res, next) {
    var fromId=req.body.fromId;
    var toId=req.body.toId;
    userController.sentfriendrequest(fromId,toId,function(err,updatedSentUser){
        if(err){
             return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
        }
        var sentStatus;
        updatedSentUser.sentfriendrequests.forEach((request)=>{
            if(request.Tofriend.equals(toId)){
                sentStatus=request.requeststatus;
                 console.log(sentStatus);
           
            }
        });
        userController.receivedfriendrequest(fromId,toId,function(err,updatedreceiveduser){
            if(err){
               return res.status(500).json({
               tittle:'An error occured',
               error:err
           });  
            }
            res.status(200).json({
           sentStatus:sentStatus
          
       });
        });
    });
    
});
router.post('/addfriends/confirmfriendsrequest',function(req,res,next){
    var fromId=req.body.fromId;
    var toId=req.body.toId;
    userController.confirmfriendrequest(fromId,toId,function(err,updatedreceivedusertUser){
        if(err){
             return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
        }
         userController.updatedSentrequestUser(fromId,toId,function(err,updatedSentUser){
             if(err){
             return res.status(500).json({
               tittle:'An error occured',
               error:err
           });
            }
             res.status(200).json({
           done:'done'
           
       });
            
         });
    });    
});
router.post('/friendslist',function(req, res, next) {
    var id=req.body.id;
    console.log(id);
    User.findById(id,function(err,user){
        if(err){
          return res.status(500).json({
               tittle:'An error occured',
               error:err
           });  
        }
        var friendslist=new Array();
        var friendid=new Array();
        console.log(user);
        console.log('printing friends');
        console.log(user.friends);
        var index=1;
        var contains =false;
        var length=user.friends.length;
        if(user.friends){
        user.friends.forEach((friend)=>{
            console.log(friend);
            User.findById(friend,function(err,user2){
                if(err){
                    return res.status(500).json({
                    tittle:'An error occured',
                    error:err
           });  
                }
                console.log("user2");
                console.log(user2);
                friendid.push(friend);
               for(var i=0;i<friendid.length;i++){
                   console.log(friendid[i]);
                   if(i!=0){
                if(friendid[i]==friend){
                    contains=true;
                }
                   }
               }
               console.log(contains)
               if(!contains){
               friendslist.push({id:friend,name:user2.firstname});
               }
                console.log(friendslist);
                if(index==length){
                    return res.status(200).json({
            friendslist:friendslist
             });
                }
                index++;
                contains=false;
                
            });
        });
            
        }
        console.log("printing friendlist before res dispatch",friendslist);
        
        console.log(friendslist);
        
    });
    
    
});
module.exports = router;