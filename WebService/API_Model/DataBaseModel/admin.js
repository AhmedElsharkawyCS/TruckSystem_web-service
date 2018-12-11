var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var adminSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
        FK_companyCode:{ 
            type:mongoose.Schema.Types.ObjectId,ref:'Company',
            require:true
    
        },
        adminUserName:{
            type:String,
            required:true
        },
        adminPassword:{
            type:String,
            required:true
        },
        adminStatus:{
            type:Boolean,
            required:true,
            default:true
        },


      
},{versionKey:false});
 
module.exports=mongoose.model('Admin',adminSchema);
 