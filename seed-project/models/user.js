var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var mongooseuniquevalidator=require('mongoose-unique-validator');
var userslist;



var receivedfriendrequestsSchema=new Schema({
    fromFriend:{type:Schema.Types.ObjectId,ref:'User'},
     requeststatus:{type:String}
})

var sentfriendrequestsSchema=new Schema({
    Tofriend:{type:Schema.Types.ObjectId,ref:'User'},
        requeststatus:{type:String}
})

var schema=new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    messages:[{type:Schema.Types.ObjectId,ref:'Message'}],
    friends:[{type:Schema.Types.ObjectId,ref:'User'}],
    sentfriendrequests:[sentfriendrequestsSchema],
    receivedfriendrequests:[receivedfriendrequestsSchema],
    Status:{type:String}
});
schema.post('save', function(doc) {
    
    console.log("am in post save and users ist is");
    console.log(doc);
  userslist=doc.friends;
  console.log(userslist);
});
console.log(userslist);
schema.plugin(mongooseuniquevalidator);
module.exports=mongoose.model('User',schema);
exports.userslist=userslist;

