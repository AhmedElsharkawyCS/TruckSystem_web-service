const express=require('express');
const router=express.Router();
const Driver=require('../DataBaseModel/driver');
const mongoose=require('mongoose');
const Company=require('../DataBaseModel/company');
const checkAuth=require('../midleware/Check_Auth');

router.get('/',checkAuth,(req,res,next)=>{
   Driver.find()
   .exec()
   .then((result) => {
       //console.log(result);
       if(result){
        //   const response={
        //       count:result.length,
        //       driver:result.map(values=>{
        //           return{
        //             _id:values._id,
        //             FK_companyCode :values.FK_companycode,
        //             driverName:values.driverName,
        //             driverLicense:values.driverLicense,
        //              licenseDate:values.licenseDate,
        //             licenseExpire:values.licenseExpire,
        //             nationalID:values.nationalID,
        //             driverStatus:values.driverStatus,
        //             request:{
        //                 type:'GET',
        //                 url:'http://localhost:8000/driver/'+values._id
        //             }
        //           }
        //       })
        //   }
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
             var driver=new Driver({
                _id:new mongoose.Types.ObjectId,
                FK_companyCode :req.body.FK_companycode,
                driverName:req.body.driverName,
                driverLicense:req.body.driverLicense,
                licenseDate:req.body.licenseDate,
                licenseExpire:req.body.licenseExpire,
                nationalID:req.body.nationalID,
                driverStatus:req.body.driverStatus
       });
          return driver.save();
       })
       .then((result) => {
           console.log(result);
           res.status(200).json(result);
        //     message:"create driver",
        //     driver:{
        //         _id:result._id,
        //         FK_companyCode :result.FK_companycode,
        //         driverName:result.driverName,
        //         driverLicense:result.driverLicense,
        //          licenseDate:result.licenseDate,
        //         licenseExpire:result.licenseExpire,
        //         nationalID:result.nationalID,
        //         driverStatus:result.driverStatus
        //       },
        //         request:{
        //             type:'POST',
        //             url:'http://localhost:8000/driver/'+result._id
        //         }
        //    });
       }).catch((err) => {
           console.log(err);
           res.status(500).json({
               error:err
           });
       });
    });
    //####################

router.get('/:driverID',checkAuth,(req,res,next)=>{
    const id=req.params.driverID;
    Driver.findById(id)
    .exec()
    .then((result) => {
        console.log(result);
       if(result){
           res.status(200).json(result);
              // driver:result,
            //    request:{
            //        type:'GET',
            //        url:'http://localhost:8000/driver/'
            //    }
          // });
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

router.patch('/:driverID',checkAuth,(req,res,next)=>{
    const id=req.params.driverID;
    var driver={
            driverName:req.body.driverName,
            driverLicense:req.body.driverLicense,
             licenseDate:req.body.licenseDate,
            licenseExpire:req.body.licenseExpire,
            nationalID:req.body.nationalID,
            driverStatus:req.body.driverStatus
    };
    // const updateOps={};
    // for(const ops of req.body){
    //     updateOps[ops.propName]=ops.value;
    // }
    Driver.update({_id:id},{$set:driver})
    .exec()
    .then((result) => {
        console.log(result);
        res.status(200).json({
            message:'Driver updated',
            // request:{
            //     type:"PATCH",
            //     url:'http://localhost:8000/driver/'+id
            // }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });;
});

router.delete('/:driverID',checkAuth,(req,res,next)=>{
    const id=req.params.driverID;
    Driver.remove({_id:id})
    .exec()
    .then((result) => {
        res.status(200).json({
            message:"driver deleted",
            // request:{
            //     type:"PATCH",
            //     url:'http://localhost:8000/driver/'
            // }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});



module.exports=router;