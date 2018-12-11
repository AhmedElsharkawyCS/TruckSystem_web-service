var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var TruckSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    FK_companycode :{
        type:mongoose.Schema.Types.ObjectId,ref:'Company',
        require:true
    },
    vinnumber:{
        type:String,
        require:true
    },
    plateeumber:{
        type:String,
        require:true
    },
    licensedate:{
        type:Date,
        require:true
    },
    licenseexpire:{
        type:Date,
        require:true
    },
    brand:{
         type:String,
         require:true
    },
    model:{
        type:Date,
        require:true
    },
    modelyear:{
        type:Number,
        require:true
    }

},{ versionKey: false });

module.exports=mongoose.model('Truck',TruckSchema);
 