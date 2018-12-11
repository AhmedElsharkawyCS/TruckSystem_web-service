const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Expense=require('../DataBaseModel/expense');
const Trip=require('..//DataBaseModel/trip');
const checkAuth=require('../midleware/Check_Auth');

router.get('/',checkAuth,(req,res,next)=>{
    Expense.find()
    .exec()
    .then((result) => {
        console.log(result);
        if(result.length>=0){
           const response={
               count:result.length,
               expense:result.map(values=>{
                   return{
                     _id:values._id,
                     FK_tripCode:values.FK_tripCode,
                     expenseType:values.expenseType,
                     expenseValue:values.expenseValue,
                     longitude:values.longitude,
                     latitude:values.latitude,
                     request:{
                         type:'GET',
                         url:'http://localhost:8000/expense/'+values._id
                     }
                   }
               })
           }
           res.status(200).json({response});
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
   
    Trip.findById(req.body.FK_tripCode)
    .then((result) => {
        if(!result){
            return res.status(404).json({
                message:'Company not found!'
            })
        }
        var expense=new Expense({
            _id:new mongoose.Types.ObjectId,
            FK_tripCode:req.body.FK_tripCode,
            expenseType:req.body.expenseType,
            expenseValue:req.body.expenseValue,
            longitude:req.body.longitude,
            latitude:req.body.latitude
   });
     return expense.save();
  })
  .then((result) => {
      console.log(result);
      res.status(200).json({
        message:"create expense",
        expense:{
           _id:values._id,
           FK_tripCode:result.FK_tripCode,
           expenseType:result.expenseType,
           expenseValue:result.expenseValue,
           longitude:result.longitude,
           latitude:result.latitude
            },
            request:{
                type:'POST',
                url:'http://localhost:8000/expense/'+result._id
            }
      });
  }).catch((err) => {
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
});
//####################

 router.get('/:expenseID',checkAuth,(req,res,next)=>{
     const id=req.params.expenseID;
     Expense.findById(id)
     .exec()
     .then((result) => {
         console.log(result);
        if(result){
            res.status(200).json({
                expense:result,
                request:{
                    type:'GET',
                    url:'http://localhost:8000/expense/'
                }
            });
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
 
 router.patch('/:expenseID',checkAuth,(req,res,next)=>{
     const id=req.params.expenseID;
     var expense={
        expenseType:req.body.expenseType,
        expenseValue:req.body.expenseValue,
        longitude:req.body.longitude,
        latitude:req.body.latitude
     };
     // const updateOps={};
     // for(const ops of req.body){
     //     updateOps[ops.propName]=ops.value;
     // }
     Expense.update({_id:id},{$set:expense})
     .exec()
     .then((result) => {
         console.log(result);
         res.status(200).json({
             message:'Driver expense',
             request:{
                 type:"PATCH",
                 url:'http://localhost:8000/expense/'+id
             }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:expenseID',checkAuth,(req,res,next)=>{
     const id=req.params.expenseID;
     Expense.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"expense deleted",
             request:{
                 type:"PATCH",
                 url:'http://localhost:8000/expense/'
             }
         });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });
 });
 
 
 
 module.exports=router;