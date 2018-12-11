var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var AtachementSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    FK_companyCode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Company',
        require:true
    },
    vinNumber:{
        type:Number,
        require:true
    },
    plateNumber:{
        type:Number,
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
    brand:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    modelYear:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true
    }

},{ versionKey: false });
module.exports=mongoose.model('Atachement',AtachementSchema);