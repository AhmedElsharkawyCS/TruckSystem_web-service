const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Truck=require('../DataBaseModel/truck');
const Company=require('../DataBaseModel/company');
const checkAuth=require('../midleware/Check_Auth');

router.get('/',checkAuth,(req,res,next)=>{
    Truck.find()
    .exec()
    .then((result) => {
       // console.log(result);
        if(result){
        //    const response={
        //        count:result.length,
        //        truck:result.map(values=>{
        //            return{
        //              _id:values._id,
        //              FK_companyCode:values.getCompanyCode,
        //              vinNumber:values.vinNumber,
        //              plateNumber:values.plateNumber,
        //              licenseDate:values.licenseDate,
        //              licenseExpire:values.licenseExpire,
        //              brand:values.brand,
        //              model:values.model,
        //              modelYear:values.modelYear,
        //              request:{
        //                  type:'GET',
        //                  url:'http://localhost:8000/truck/'+values._id
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
        var truck=new Truck({
            _id:new mongoose.Types.ObjectId,
            FK_companyCode:req.body.getCompanyCode,
            vinNumber:req.body.vinNumber,
            plateNumber:req.body.plateNumber,
            licenseDate:req.body.licenseDate,
            licenseExpire:req.body.licenseExpire,
            brand:req.body.brand,
            model:req.body.model,
            modelYear:req.body.modelYear
   });
     return truck.save();
  })
  .then((result) => {
      console.log(result);
      res.status(200).json(result);  
        //     message:"create truck",
    //          truck:{
    //             _id:result._id,
    //             FK_companyCode:result.getCompanyCode,
    //             vinNumber:result.vinNumber,
    //             plateNumber:result.plateNumber,
    //             licenseDate:result.licenseDate,
    //             licenseExpire:result.licenseExpire,
    //             brand:result.brand,
    //             model:result.model,
    //             modelYear:result.modelYear
    //              },
    //              request:{
    //                  type:'POST',
    //                  url:'http://localhost:8000/truck/'+result._id
    //              }
    //   });
  }).catch((err) => {
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
});
//####################
 router.get('/:truckID',checkAuth,(req,res,next)=>{
     const id=req.params.truckID;
     Truck.findById(id)
     .exec()
     .then((result) => {
         console.log(result);
        if(result){
            res.status(200).json(result);
                // truck:result,
                // request:{
                //     type:'GET',
                //     url:'http://localhost:8000/truck/'
                // }
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
 
 router.patch('/:truckID',checkAuth,(req,res,next)=>{
     const id=req.params.truckID;
     var truck={
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
     Truck.update({_id:id},{$set:truck})
     .exec()
     .then((result) => {
         console.log(result);
         res.status(200).json({
             message:'truck updated',
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/driver/'+id
            //  }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:truckID',checkAuth,(req,res,next)=>{
     const id=req.params.truckID;
     Truck.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"truck deleted",
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/truck/'
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