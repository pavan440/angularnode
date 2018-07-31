var message =require('../models/message.js');
var usercontroller=require('./UserController.js');
 class MessageController{
    MessageController(){
        
    }
    getMessages(userid,callback){
        console.log("in getmessages method");
        console.log(userid);
        //console.log(userid)
        //if(!userid.equals(null)){
          usercontroller.findbyId(userid,function(err,user){
            if(err){
                callback(err,null);
                
            }
            
            var userfriendlist =new Array();
            console.log(user);
            if(user.friends){
            userfriendlist=user.friends;}
            userfriendlist.push(userid);
            console.log("message controller printing userfriendlist");
            console.log(userfriendlist);
            
             message.find({user: {$in:userfriendlist}}, function (err,messages){
                 if(err){
                     callback(err,null);
                 }
                 if(!messages){
                     callback(null,null);
                 }
                 console.log(messages);
                 var transformedmessages=new Array();
                 var i=0;
                 var l=messages.length;
                 console.log(l);
                 
                 messages.forEach(message=>{
                     usercontroller.findbyId(message.user,function(err,user){
                         if(err){
                             callback(err,null);
                         }
                         console.log("am in user controller inside mesage contorller");
                         console.log(message);
                        transformedmessages.push({id:message._id,content:message.content,username:user.firstname,userId:message.user,filename:message.filename,type:message.type});
                        i++;
                        if(i==l){
                            console.log(i);
                            console.log(l);
                        console.log("transformedmessages");
                        console.log(transformedmessages);
                        callback(null,transformedmessages);
                        }
                     });
                 });
                 
                 
             });
            
        });
    
    
    }
   
    
}
module.exports=new MessageController();