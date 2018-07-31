var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schema=new Schema({
     _id: Schema.Types.ObjectId,
    user:Schema.Types.ObjectId,
    status:String,
    RequestedUserId:Schema.Types.ObjectId
});
module.exports=mongoose.model('Friend',schema);