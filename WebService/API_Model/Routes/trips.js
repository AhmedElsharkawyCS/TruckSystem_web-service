const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Trip=require('../DataBaseModel/trip');
const Company=require('../DataBaseModel/company');
const Customer=require('..//DataBaseModel/customer');
const Truck =require('../DataBaseModel/truck');
const Atachement=require('../DataBaseModel/atachement');
const User =require('../DataBaseModel/user');
const Driver=require('../DataBaseModel/driver');
const checkAuth=require('../midleware/Check_Auth');


router.get('/',checkAuth,(req,res,next)=>{
    Trip.find()
    .exec()
    .then((result) => {
        console.log(result);
        if(result){
        //    const response={
        //        count:result.length,
        //        trip:result.map(values=>{
        //            return{
        //                 _id:values._id,
        //                 FK_companycode:values.FK_companycode,
        //                 FK_customercode:values.FK_customercode,
        //                 FK_truckcode:values.FK_truckcode,
        //                 FK_attachmentcode:values.FK_attachmentcode,
        //                 FK_drivercode:values.FK_drivercode,
        //                 FK_usercode:values.FK_usercode,
        //                 fromcountry:values.fromcountry,
        //                 fromcovernance:values.fromcovernance,
        //                 fromcity:values.fromcity,
        //                 fromaddress	:values.fromaddress,
        //                 tocountry:values.tocountry,
        //                 tocovernance:values.tocovernance,
        //                 tocity:values.tocity,
        //                 toaddress:values.toaddress,
        //                 shipmenttype:values.shipmenttype,	
        //                 shipmentwieght:values.shipmentwieght,
        //                 shipmentvalue:values.shipmentvalue,
        //                 custdyamount:values.custdyamount,
        //              request:{
        //                  type:'GET',
        //                  url:'http://localhost:8000/trip/'+values._id
        //              }
        //            }
        //        })
        //    }
           res.status(200).json(result);
        }else{
         res.status(404).json({message:"No entries found"});
        }
        
    }).catch((err) => {
     res.status(500).json({
         error:err
     });
    });
 });
 
 router.post('/',checkAuth,(req,res,next)=>{
  
    Company.findById(req.body.FK_companyCode)
    .then((result) => {
        if(!result){
            return res.status(404).json({
                message:'Company not found!'
            })
        }
        var trip=new Trip({
            _id:new mongoose.Types.ObjectId,
            FK_companycode:req.body.getCompanyCode,
            FK_customercode:req.body.getCustomerCode,
            FK_truckcode:req.body.getTruckCode,
            FK_attachmentcode:req.body.getAtachementCode,
            FK_drivercode:req.body.getDriverCode,
            FK_usercode:getUserCode,
            fromcountry:req.body.fromcountry,
            fromcovernance:req.body.fromcovernance,
            fromcity:req.body.fromcity,
            fromaddress	:req.body.fromaddress,
            tocountry:req.body.tocountry,
            tocovernance:req.body.tocovernance,
            tocity:req.body.tocity,
            toaddress:req.body.toaddress,
            shipmenttype:req.body.shipmenttype,	
            shipmentwieght:	req.body.shipmentwieght,
            shipmentvalue:	req.body.shipmentvalue,
            custdyamount:req.body.custdyamount
     });
     return trip.save();
  })
  .then((result) => {
      console.log(result);
      res.status(200).json(result)
    //     message:"create trip",
    //          trip:{
    //             _id:result._id,
    //             FK_companycode:result.FK_companycode,
    //             FK_customercode:result.FK_customercode,
    //             FK_truckcode:result.FK_truckcode,
    //             FK_attachmentcode:result.FK_attachmentcode,
    //             FK_drivercode:result.FK_drivercode,
    //             FK_usercode:result.FK_usercode,
    //             fromcountry:result.fromcountry,
    //             fromcovernance:result.fromcovernance,
    //             fromcity:result.fromcity,
    //             fromaddress	:result.fromaddress,
    //             tocountry:result.tocountry,
    //             tocovernance:result.tocovernance,
    //             tocity:result.tocity,
    //             toaddress:result.toaddress,
    //             shipmenttype:result.shipmenttype,	
    //             shipmentwieght:result.shipmentwieght,
    //             shipmentvalue:result.shipmentvalue,
    //             custdyamount:result.custdyamount
    //             },
    //          request:{
    //                  type:'POST',
    //                  url:'http://localhost:8000/trip/'+result._id
    //              }
    //   });
  }).catch((err) => {
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
});

 router.get('/:tripID',checkAuth,(req,res,next)=>{
     const id=req.params.tripID;
     Trip.findById(id)
     .exec()
     .then((result) => {
         console.log(result);
        if(result){
            res.status(200).json(result);
                            // trip:result,
                // request:{
                //     type:'GET',
                //     url:'http://localhost:8000/trip/'
                // }
          //
        }else{
            res.status(404).json({message:"No data found"});
        }
     }).catch((err) => {
         console.log(err)
         res.status(500).json({
             error:err
         });
     });
 });
 
 router.patch('/:tripID',checkAuth,(req,res,next)=>{
     const id=req.params.tripID;
     var trip={
        fromcountry:req.body.fromcountry,
        fromcovernance:req.body.fromcovernance,
        fromcity:req.body.fromcity,
        fromaddress	:req.body.fromaddress,
        tocountry:req.body.tocountry,
        tocovernance:req.body.tocovernance,
        tocity:req.body.tocity,
        toaddress:req.body.toaddress,
        shipmenttype:req.body.shipmenttype,	
        shipmentwieght:	req.body.shipmentwieght,
        shipmentvalue:req.body.shipmentvalue,
        custdyamount:req.body.custdyamount
     };
     // const updateOps={};
     // for(const ops of req.body){
     //     updateOps[ops.propName]=ops.value;
     // }
     Trip.update({_id:id},{$set:trip})
     .exec()
     .then((result) => {
         console.log(result);
         res.status(200).json({
             message:'trip updated',
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/trip/'+id
            //  }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:tripID',checkAuth,(req,res,next)=>{
     const id=req.params.tripID;
     Trip.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"trip deleted",
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/trip/'
            //  }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });
 });
 
 
 
 module.exports=router;