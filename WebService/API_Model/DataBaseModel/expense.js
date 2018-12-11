var mongoose=require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;


var ExpensesSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    FK_tripCode:{
        type:mongoose.Schema.Types.ObjectId,ref:'Trip',
        require:true
    },
    expenseType:{
        type:String,
        require:true
    },
    expenseValue:SchemaTypes.Decimal128,
    longitude:SchemaTypes.Decimal128,
    latitude:SchemaTypes.Decimal128

},{ versionKey: false });

module.exports=mongoose.model('Expense',ExpensesSchema);
 