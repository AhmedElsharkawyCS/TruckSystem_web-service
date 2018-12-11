const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../DataBaseModel/user');
const Company=require('../DataBaseModel/company');
const checkAuth=require('../midleware/Check_Auth');

router.get('/',checkAuth,(req,res,next)=>{
    User.find()
    .exec()
    .then((result) => {
        console.log(result);
        if(result){
        //    const response={
        //        count:result.length,
        //        user:result.map(values=>{
        //            return{
        //             _id:result._id,
        //             FK_companyCode:values.FK_companyCode,
        //             userName:values.userName,
        //             userPassword:values.userPassword,
        //             userDepartment:values.userDepartment,
        //             userStatus:values.userStatus,
        //             userType:values.userType,
        //              request:{
        //                  type:'GET',
        //                  url:'http://localhost:8000/user/'+values._id
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
        var user=new User({
            _id:new mongoose.Types.ObjectId,
            FK_companyCode:req.body.FK_companyCode,
            userName:req.body.userName,
            userPassword:req.body.userPassword,
            userDepartment:req.body.userDepartment,
            userStatus:req.body.userStatus,
            userType:req.body.userType
        });
     return user.save();
  })
  .then((result) => {
      console.log(result);
      res.status(200).json(result);
    //     message:"create user",
    //     user:{
    //            _id:result._id,
    //            FK_companyCode:result.FK_companyCode,
    //            userName:result.userName,
    //            userPassword:result.userPassword,
    //            userDepartment:result.userDepartment,
    //            userStatus:result.userStatus,
    //            userType:result.userType
    //         },
    //          request:{
    //             type:'POST',
    //             url:'http://localhost:8000/user/'+result._id
    //         }
    //   });
  }).catch((err) => {
      console.log(err);
      res.status(500).json({
          error:err
      });
  });
});
//####################
 router.get('/:userID',checkAuth,(req,res,next)=>{
     const id=req.params.userID;
     User.findById(id)
     .exec()
     .then((result) => {
         console.log(result);
        if(result){
            res.status(200).json(result);
            //     truck:result,
            //     request:{
            //         type:'GET',
            //         url:'http://localhost:8000/user/'
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
 
 router.patch('/:userID',checkAuth,(req,res,next)=>{
     const id=req.params.userID;
     var user={
        userName:req.body.userName,
        userPassword:req.body.userPassword,
        userDepartment:req.body.userDepartment,
        userStatus:req.body.userStatus,
        userType:req.body.userType,
     };
     // const updateOps={};
     // for(const ops of req.body){
     //     updateOps[ops.propName]=ops.value;
     // }
     User.update({_id:id},{$set:user})
     .exec()
     .then((result) => {
         console.log(result);
         res.status(200).json({
             message:'user updated',
        //      request:{
        //          type:"PATCH",
        //          url:'http://localhost:8000/user/'+id
        //      }
          });
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });;
 });
 
 router.delete('/:userID',checkAuth,(req,res,next)=>{
     const id=req.params.userID;
     User.remove({_id:id})
     .exec()
     .then((result) => {
         res.status(200).json({
             message:"user deleted",
            //  request:{
            //      type:"PATCH",
            //      url:'http://localhost:8000/user/'
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