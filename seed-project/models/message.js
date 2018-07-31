var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var User=require('./user');


var schema=new Schema({
    content:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    filename:{type:String},
    type:{type:String},
    username:{type:String}
});

module.exports=mongoose.model('Message',schema);
