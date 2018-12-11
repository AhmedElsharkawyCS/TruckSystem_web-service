const express=require('express');
const app=express();
const cors=require('cors');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
//include routing 
const driverRoute=require('./Routes/drivers');
const atachementRoute=require('./Routes/atachement');
const companyRoute=require('./Routes/company');
const customerRoute=require('./Routes/customer');
const expensesRoute=require('./Routes/expenses');
const tripsRoute=require('./Routes/trips');
const truckRoute=require('./Routes/truck');
const userRoute=require('./Routes/user');
const adminRoute=require('./Routes/admin')


//creaet connnections with mongodb
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected on Database Name:"+"test"+"\nDatabase Server running on:localhost:27017");
});
mongoose.Promise=global.Promise;
//return tokens and colored req and error in log 
app.use(morgan('dev'));
//parse data
app.use(bodyParser.urlencoded({
    extended:false
})); 
app.use(bodyParser.json());
//app.use(cors());
//handle CORS(Cross-Origin Resource Shaering)
//handle request between client and server if they have different url
// app.use((req,res,next)=>{
//     //all to any client
//     res.header("Access-Control-Allow-Origin", "*");
//     //which header can be sent
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,Authorization",);
//     if(req.method==='OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'GET , PUT , POST , DELETE , PATCH ');
//         return res.status(200).json({});
//     }
//     next();
// }); 

//handle requests of each item 
app.use('/driver', driverRoute);
app.use('/atachememt', atachementRoute);
app.use('/company', companyRoute);
app.use('/customer', customerRoute);
app.use('/expense',expensesRoute );
app.use('/trip', tripsRoute);
app.use('/truck', truckRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

//handle error requests
app.use((req,res,next)=>{
  const error=new Error("Not Found!");
  error.status=404;
  next(error);
});
app.use((error,req,res,next)=>{
res.status(error.status||500).json({error:{
    message:error.message
}});
});



module.exports=app;