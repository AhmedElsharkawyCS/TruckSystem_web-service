var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var tripSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,		
    FK_companycode: {
        type:mongoose.Schema.Types.ObjectId,ref:'Company',
        require:true
    }, 			
    FK_customercode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Customer',
        require:true
    },			
    FK_truckcode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Truck',
        require:true
    },	
    FK_attachmentcode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Atachement',
        require:true
    },	
    FK_drivercode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Driver',
        require:true
    },
    FK_usercode:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        require:true
    },
    fromcountry:{
        type:String,
        require:true
    },
    fromcovernance:{
        type:String,
        require:true
    },
    fromcity:{
        type:String,
        require:true
    },
    fromaddress	:{
        type:String,
        require:true
    },
    tocountry:{
        type:String,
        require:true
    },
    tocovernance:{
        type:String,
        require:true
    },
    tocity:{
        type:String,
        require:true
    },
    toaddress:{
        type:String,
        require:true
    },
    shipmenttype:{
        type:String,
        require:true
    },			
    shipmentwieght:SchemaTypes.Decimal128,		
    shipmentvalue:SchemaTypes.Decimal128,	
    custdyamount:SchemaTypes.Decimal128,
},{ versionKey: false });

module.exports=mongoose.model('Trip',tripSchema);
 