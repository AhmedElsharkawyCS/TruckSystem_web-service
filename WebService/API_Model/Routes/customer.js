const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Customer=require('../DataBaseModel/customer');
const Company=require('../DataBaseModel/company');
const checkAuth=require('../midleware/Check_Auth');

router.get('/',checkAuth,(req,res,next)=>{
    Customer.find()
    .exec()
    .then((result) => {
        console.log(result);
        if(result){
        //    const response={
        //        count:result.length,
        //        customer:result.map(values=>{
        //            return{
        //             _id:result._id,
        //             FK_companyCode:values.FK_companycode,
        //             customerName:values.customerName,
        //             customerAddress:values.customerAddress,
        //             customerCountry:values.customerCountry,
        //             customerProviencne:values.customerProviencne,
        //             customerCity:values.customerCity,
        //             customerZipcode:values.customerZipcode,
        //             customerContact:values.customerContact,
        //             customerEmail:values.customerEmail,
        //             customerPhone:values.customerPhone,
        //             customerMobile:values.customerMobile,
        //             customerEpn:values.customerEpn,
        //             customerTaxbook:values.customerTaxbook,
        //             customerStatus:values.customerStatus,
        //              request:{
        //                  type:'GET',
        //                  url:'http://localhost:8000/customer/'+values._id
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
             var customer=new Customer({
                _id:new mongoose.Types.ObjectId,
                FK_companyCode:req.body.FK_companycode,
                customerName:req.body.customerName,
                customerAddress:req.body.customerAddress,
                customerCountry:req.body.customerCountry,
                customerProviencne:req.body.customerProviencne,
                customerCity:req.body.customerCity,
                customerZipcode:req.body.customerZipcode,
                customerContact:req.body.customerContact,
                customerEmail:req.body.customerEmail,
                customerPhone:req.body.customerPhone,
                customerMobile:req.body.customerMobile,
                customerEpn:req.body.customerEpn,
                customerTaxbook:req.body.customerTaxbook,
                customerStatus:req.body.customerStatus,
            
               });
          return customer.save();
       })
       .then((result) => {
           console.log(result);
           res.status(200).json(result);
        //        message:"create Atachement",
        //        customer:{
        //         _id:result._id,
        //         FK_companyCode:result.FK_companycode,
        //         customerName:result.customerName,
        //         customerAddress:result.customerAddress,
        //         customerCountry:result.customerCountry,
        //         customerProviencne:result.customerProviencne,
        //         customerCity:result.customerCity,
        //         customerZipcode:result.customerZipcode,
        //         customerContact:result.customerContact,
        //         customerEmail:result.customerEmail,
        //         customerPhone:result.customerPhone,
        //         customerMobile:result.customerMobile,
        //         customerEpn:result.customerEpn,
        //         customerTaxbook:result.customerTaxbook,
        //         customerStatus:result.customerStatus
        //      },
        //       request:{
        //           type:'POST',
        //           url:'http://localhost:8000/customer/'+result._id
        //       }
        //    });
       }).catch((err) => {
           console.log(err);
           res.status(500).json({
               error:err
           });
       });
    });

 router.get('/:customerID',checkAuth,(req,res,next)=>{
     const id=req.params.driverID;
     Customer.findById(id)
     .exec()
     .then((result) => {
        // console.log(result);
        if(result){
            res.status(200).json(result)
            //     customer:result,
            //     request:{
            //         type:'GET',
            //         url:'http://localhost:8000/customer/'
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
 
 router.patch('/:customerID',checkAuth,(req,res,next)=>{
     const id=req.params.customerID;
     var customer={
                   customerName:req.body.customerName,
                    customerAddress:req.body.customerAddress,
                    customerCountry:req.body.customerCountry,
                    customerProviencne:req.body.customerProviencne,
                    customerCity:req.body.customerCity,
                    customerZipcode:req.body.customerZipcode,
                    customerContact:req.body.customerContact,
                    customerEmail:req.body.customerEmail,
                    customerPhone:req.body.customerPhone,
                    customerMobile:req.body.customerMobile,
                    customerEpn:req.body.customerEpn,
                    customerTaxbook:req.body.customerTaxbook,
                    customerStatus:req.body.customerStatus
     };
     // const updateOps={};
     // for(const ops of req.body){
     //     updateOps[ops.propName]=ops.value;
     // }
     Customer.update({_id:id},{$set:customer})
     .exec()
     .then((result) => {
        // console.log(result);
         res.status(200).json({
             message:'Customer updated',
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/customer/'+id
            //  }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:customerID',checkAuth,(req,res,next)=>{
     const id=req.params.customerID;
     Customer.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"customer deleted",
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/customer/'
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