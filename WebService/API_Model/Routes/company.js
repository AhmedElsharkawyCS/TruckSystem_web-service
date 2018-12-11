const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Company=require('../DataBaseModel/company');
const checkAuth=require('../midleware/Check_Auth');

router.get('/',checkAuth,(req,res,next)=>{
    Company.find()
    .exec()
    .then((result) => {
        ///console.log(result);
         res.status(200).json(result);
    }).catch((err) => {
     res.status(500).json({
         error:err
     });
    });
 });
 
 router.post('/',checkAuth,(req,res,next)=>{
     var company=new Company({
                _id:new mongoose.Types.ObjectId,
                companyName:req.body.companyName,
                companyWebSite:req.body.companyWebSite,
                companyAddress:req.body.companyAddress,
                companyConutry:req.body.companyConutry,
                companyProvience:req.body.companyProvience,
                companyCity:req.body.companyCity,
                companyZipCode:req.body.companyZipCode,
                companyEmail:req.body.companyEmail,
                companyContact:req.body.companyContact,
                companyPhone:req.body.companyPhone,
                companyMobile:req.body.companyMobile,
                compaqnyEpn:req.body.compaqnyEpn,
                eompanyTaxBook:req.body.eompanyTaxBook,
                companyStatus:req.body.companyStatus
     });
     company.save()
     .then((result) => {
       //  console.log(result);
          res.status(200).json(result);
        //      message:"create company",
        //      company:{
        //             _id:result._id,
        //             companyName:result.companyName,
        //             companyWebSite:result.companyWebSite,
        //             companyAddress:result.companyAddress,
        //             companyConutry:result.companyConutry,
        //             companyProvience:result.companyProvience,
        //             companyCity:result.companyCity,
        //             companyZipCode:result.companyZipCode,
        //             companyEmail:result.companyEmail,
        //             companyContact:result.companyContact,
        //             companyPhone:result.companyPhone,
        //             companyMobile:result.companyMobile,
        //             compaqnyEpn:result.compaqnyEpn,
        //             eompanyTaxBook:result.eompanyTaxBook,
        //             companyStatus:result.companyStatus,
        //          request:{
        //              type:'POST',
        //              url:'http://localhost:8000/company/'+result._id
        //          }
        //      }
        //  });
     })
     .catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });
    
 });
 
 router.get('/:companyID',checkAuth,(req,res,next)=>{
     const id=req.params.companyID;
     Company.findById(id)
     .exec()
     .then((result) => {
         console.log(result);
        if(result){
            res.status(200).json(result);
                // company:result,
                // request:{
                //     type:'GET',
                //     url:'http://localhost:8000/company/'
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
 
 router.patch('/:companyID',checkAuth,(req,res,next)=>{
     const id=req.params.companyID;
     var company={
        companyName:req.body.companyName,
        companyWebSite:req.body.companyWebSite,
        companyAddress:req.body.companyAddress,
        companyConutry:req.body.companyConutry,
        companyProvience:req.body.companyProvience,
        companyCity:req.body.companyCity,
        companyZipCode:req.body.companyZipCode,
        companyEmail:req.body.companyEmail,
        companyContact:req.body.companyContact,
        companyPhone:req.body.companyPhone,
        companyMobile:req.body.companyMobile,
        compaqnyEpn:req.body.compaqnyEpn,
        eompanyTaxBook:req.body.eompanyTaxBook,
        companyStatus:req.body.companyStatus
     };
     // const updateOps={};
     // for(const ops of req.body){
     //     updateOps[ops.propName]=ops.value;
     // }
     Company.update({_id:id},{$set:company})
     .exec()
     .then((result) => {
         console.log(result);
         res.status(200).json({
             message:'Company updated',
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/company/'+id
             //}
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:companyID',checkAuth,(req,res,next)=>{
     const id=req.params.companyID;
     Company.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"Company deleted",
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/company/'
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