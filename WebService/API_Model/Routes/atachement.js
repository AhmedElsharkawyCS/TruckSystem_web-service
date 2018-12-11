const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Atachement=require('../DataBaseModel/atachement');
const Company=require('../DataBaseModel/company');
const checkAuth=require('../midleware/Check_Auth');


router.get('/',checkAuth,(req,res,next)=>{
    Atachement.find()
    .exec()
    .then((result) => {
        // console.log(result);
        if(result){
        //    const response={
        //        count:result.length,
        //        atachement:result.map(values=>{
        //            return{
        //             _id:values._id,
        //             FK_companyCode:values.FK_companyCode,
        //             vinNumber:values.vinNumber,
        //             plateNumber:values.plateNumber,
        //             licenseDate:values.licenseDate,
        //             licenseExpire:values.licenseExpire,
        //             brand:values.brand,
        //             model:values.model,
        //             modelYear:values.modelYear,
        //              request:{
        //                  type:'GET',
        //                  url:'http://localhost:8000/atachement/'+values._id
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
        var atachement=new Atachement({
            _id:new mongoose.Types.ObjectId(),
              FK_companyCode:req.body.FK_companyCode,
              vinNumber:req.body.vinNumber,
              plateNumber:req.body.plateNumber,
              licenseDate:req.body.licenseDate,
              licenseExpire:req.body.licenseExpire,
              brand:req.body.brand,
              model:req.body.model,
              modelYear:req.body.modelYear
    });
       return atachement.save();
    })
    .then((result) => {
        //console.log(result);
        res.status(200).json(result)
        //     message:"create Atachement",
        //     atachement:
        //     {
        //        _id:values._id,
        //        FK_companyCode:result.FK_companyCode,
        //        vinNumber:result.vinNumber,
        //        plateNumber:result.plateNumber,
        //        licenseDate:result.licenseDate,
        //        licenseExpire:result.licenseExpire,
        //        brand:result.brand,
        //        model:result.model,
        //        modelYear:result.modelYear
        //     },
        //      request:
        //      {
        //             type:'GET',
        //             url:'http://localhost:8000/atachement/'+values._id
        //     }
        // });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
 });
 
 router.get('/:atachementID',checkAuth,(req,res,next)=>{
     const id=req.params.atachementID;
     Atachement.findById(id)
     .exec()
     .then((result) => {
         console.log(result);
        if(result){
            res.status(200).json(result);
            //     atachement:result,
            //     request:{
            //         type:'GET',
            //         url:'http://localhost:8000/atachement/'
            //     }
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
 
 router.patch('/:atachementID',checkAuth,(req,res,next)=>{
     const id=req.params.atachementID;
     var atachement={
        vinNumber:req.body.vinNumber,
        plateNumber:req.body.plateNumber,
        licenseDate:req.body.licenseDate,
        licenseExpire:req.body.licenseExpire,
        brand:req.body.brand,
        model:req.body.model,
        modelYear:req.body.modelYear
     };
     // const updateOps={};
     // for(const ops of req.body){
     //     updateOps[ops.propName]=ops.value;
     // }
     Atachement.update({_id:id},{$set:atachement})
     .exec()
     .then((result) => {
         console.log(result);
         res.status(200).json({
             message:'Atachement updated',
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/atachement/'+id
            //  }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:atachementID',checkAuth,(req,res,next)=>{
     const id=req.params.atachementID;
     Atachement.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"Atachement deleted",
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/atachement/'
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