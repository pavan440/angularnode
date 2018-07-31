var User =require('../models/user.js');
class UserController{
     
    UserController(){
        
    }
    findbyId(Id,callback){
       
         console.log("am in finbyid in usercontroller");
         console.log(Id);
        // var User =require('../models/user.js');
         User.findById(Id,function(err,user){
             console.log("inside userfindby");
        if(err){
            console.log(err);
           callback(err,null);
       }
       if(!user){
           console.log("no user");
          callback(err,null);
       }
       console.log("user in findbyidmethod",user);
       callback(null,user);
       
         });
    }
    saveuser(id,login,callback){
         User.findById(id,function(err,user){
             console.log("inside userfindby");
        if(err){
            console.log(err);
           callback(err,null);
       }
       if(!user){
           console.log("no user");
          callback(err,null);
       }
       user.Status=login;
       console.log("user in findbyidmethod",user);
        user.save(function(err,result){
         if(err){
           console.log(err);
                }
         console.log(result);
         callback(null,user);
        }
        );
         });
      
    }
    userfriendslist(Id,callback){
        console.log("fetching user friends list");
        var userfriendlist =new Array();
        var userfriends=new Array();
         User.findById(Id,function(err,user){
             console.log("inside userfindby");
        if(err){
            console.log(err);
           callback(err,null);
       }
       if(!user){
           console.log("no user");
          callback(err,null);
       }
       console.log(user.friends);
        userfriendlist=user.friends;
    
        
           User.find({_id: {$in:userfriendlist}}, function (err, users){
               if(err){
                   callback(err,null);
               }
               users.forEach(user=>{
                   //console.log(JSON.parse(user));
                   //userfriends.push(user);
                   if(user.Status==null){
                       user.Status="logout";
                   }
                   userfriends.push({id:user._id,name:user.firstname,Status:user.Status});
                    //userfriends.push({id:user._id,name:user.firstname,Status:user.Status});
                   
                   //JSON.parse(userfriends);
               });
               console.log("am printing userfriends");
               console.log(JSON.stringify(userfriends));
               callback(null,userfriends);
           });
        
       
         }); 
        
    }
    sentfriendrequest(fromId,toId,callback){
        
        User.findById(fromId,function(err,user){
          if(err){
              callback(err,null);
          } 
          if(!user){
           console.log("no user");
          callback(err,null);
            }
         
          user.sentfriendrequests.push({Tofriend:toId, requeststatus:'pending'});
          user.save(function(err,updatedSentUser){
              if(err){
                callback(err,null);  
              }
              callback(null,updatedSentUser);
          });
        });
    }
    receivedfriendrequest(fromId,toId,callback){
        
        User.findById(toId,function(err,user){
            if(err){
                callback(err,null);
            }
            if(!user){
           console.log("no user");
          callback(err,null);
            }
            user.receivedfriendrequests.push({fromFriend:fromId,requeststatus:'pending'});
            user.save(function(err,updatedreceiveduser){
               if(err){
                   callback(err,null);
               } 
               callback(null,updatedreceiveduser);
            });
        });
        
    }
    confirmfriendrequest(fromId,toId,callback){
       // var User =require('../models/user.js');
       console.log(fromId);
       console.log(toId);
        var sub_Doc_Id;
       User.findById(fromId,function(err,user){
          if(err){
              callback(err,null);
          } 
          if(!user){
           console.log("no user");
          callback(err,null);
            }
            var i=0;
            var item;
          user.receivedfriendrequests.forEach((receivedfriendrequest)=>{
              
              console.log(user.receivedfriendrequests[i]);
              if(receivedfriendrequest.fromFriend==toId){
                  item=i;
                  receivedfriendrequest.requeststatus='confirmed';
                  sub_Doc_Id=receivedfriendrequest._id;
                  
              }
              i++;
          });
          user.receivedfriendrequests[item].remove();
          user.friends.push(toId);
          user.save(function(err,user){
              if(err){
                callback(err,null);  
              }
              callback(null,user);
          })
          
        });
    }
    updatedSentrequestUser(fromId,toId,callback){
         var sub_Doc_Id;
        User.findById(toId,function(err,user){
            if(err){
              callback(err,null);      
            }
            if(!user){
           console.log("no user");
          callback(err,null);
            }
            var index=0;
            var item1;
            user.sentfriendrequests.forEach((sentfriendrequest)=>{
                if(sentfriendrequest.Tofriend==fromId){
                    item1=index;
                    sentfriendrequest.requeststatus='confirmed';
                    sub_Doc_Id=sentfriendrequest._id;
                }
                index++
            });
            user.sentfriendrequests[item1].remove();
            user.friends.push(fromId);
            user.save(function(err,user){
                if(err){
                    callback(err,null);
                }
                callback(null,user);
                
            });
        });
    }
    
}
module.exports=new UserController();