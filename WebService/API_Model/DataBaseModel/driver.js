var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var driverSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    FK_companyCode :{
        type:mongoose.Schema.Types.ObjectId,ref:'Company',
        require:true
    },
    driverName:{
        type:String,
        require:true
    },
    driverLicense:{
         type:String,
         require:true
    },
     licenseDate:{
        type:Date,
        require:true
    },
    licenseExpire:{
        type:Date,
        require:true
    },
    nationalID:{
        type:Number,
        require:true
    },
    driverStatus:{
        type:Boolean,
        require:true
    }
    

},{ versionKey: false });

module.exports=mongoose.model( 'Driver',driverSchema);