var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
        FK_companyCode:{ 
            type:mongoose.Schema.Types.ObjectId,ref:'Company',
            require:true
    
        },
        userName:{
            type:String,
            required:true
        },
        userPassword:{
            type:String,
            required:true
        },
        userDepartment:{ 
            type:String,
            required:true
        },
       
        userStatus:{
            type:Boolean,
            required:true
        },


      
},{versionKey:false});
 
module.exports=mongoose.model('User',UserSchema);
 