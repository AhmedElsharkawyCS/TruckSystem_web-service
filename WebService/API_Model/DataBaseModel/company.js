var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var companySchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
        companyName:{
            require:true,
            type:String
        },
        companyWebSite:{
            type:String,
            require:true
        },
        companyAddress:{
            type:String,
            require:true
        },
        companyConutry:{ 
            type:String,
            require:true
        },
        companyProvience:{
            type:String,
            require:true
        },
        companyCity:{
            type:String,
            require:true
        },
        companyZipCode:{
            type:Number,
            require:true,
             $max: { highScore: 99999 }
        },
        companyEmail:{
            type:String,
            require:true
        },
        companyContact:{
            type:Number,
            require:true
        },
        companyPhone:{
            type:Number,
            require:true
        },
        companyMobile:{
            type:Number,
            require:true
        },
        compaqnyEpn:{
            type:Number,
            require:true
        },
        eompanyTaxBook:{
            type:String
            ,require:true
        },
        companyStatus:{
            type:Boolean,
            require:true
        }


      
},{versionKey:false});

module.exports=mongoose.model('Company',companySchema);
 