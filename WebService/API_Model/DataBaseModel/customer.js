var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var customerSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    FK_companyCode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Company',
        require:true
    } ,
    customerName:{
        type:String,
        require:true
    },
    customerAddress:{
        type:String,
        require:true
    },
    customerCountry:{
        type:String,
        require:true
    },
    customerProviencne:{
        type:String
        , require:true
    },
    customerCity:{
        type:String,
        require:true
    },
    customerZipcode:{
        type:Number,
        required:true,
         $max: { highScore: 99999 }
    },
    customerContact:{
        type:Number,
        require:true
    },
    customerEmail:{
        type:String,
        require:true
    },
    customerPhone:{
        type:Number,
        require:true
    },
    customerMobile:{
         type:Number,
         require:true
    },
    customerEpn:{
        type:String,
        require:true
    },
    customerTaxbook:{
        type:String,
        require:true
    },
    customerStatus:{
        type:Boolean, require:true
    }

      
},{versionKey:false});
 
module.exports=mongoose.model('Customer',customerSchema);
 