const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Admin=require('../DataBaseModel/admin');
const Company=require('../DataBaseModel/company');
const becrypt=require('bcrypt');
const checkAuth=require('../midleware/Check_Auth');
const jwt=require('jsonwebtoken');

//create new admin 
router.post('/signup',(req,res,next)=>{
 Admin.find({ adminUserName:req.body.adminUserName})
 .exec()
 .then((result) => {
     if(result.length>=1){
         //conflict //double user
         return res.status(409).json({
             message:"Admin exists"
         });
     }else{
        Company.findById(req.body.FK_companyCode)
        .then((result) => {
           if(!result){
               return res.status(404).json({
                   message:'Company not found!'
               })
           }
           becrypt.hash(req.body.adminPassword,10,(err,hash)=>{
               if(err){
                   return res.status(500).json({
                       error:err
                   });
               }else{
                   var admin=new Admin({
                       _id:new mongoose.Types.ObjectId(),
                       FK_companyCode:req.body.FK_companyCode,//5b42f4ddabbb27aaa3dbfad9
                       adminUserName:req.body.adminUserName,
                       adminPassword:hash,                          
                       adminStatus:req.body.adminStatus,
                      });
                   admin.save()
                   .then((result) => {
                       res.status(201).json({
                           message:"Admin created",
                          // admin:result
                       });
                   }).catch((err) => {
                       console.log(err);
                       res.status(500).json({
                           error:err
                       }); 
                   });
                   }
               });
     //})
    //  .then((result) => {
    //      console.log("FK_companyCode is found");
     }).catch((err) => {
         console.log(err);
         res.status(500).json({
             error:err
         });
     });
     }   
 })
});


router.delete('/:adminID',checkAuth,(req,res,next)=>{
    Admin.remove({_id:req.params.adminID})
    .exec()
    .then((result) => {
                   res.status(200).json({
                        message:'Admin Deleted',
                       // _id:req.params.adminID
                   });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

//login usnig exists admin
router.post('/login',(req,res,next)=>{
    Admin.find({ adminUserName:req.body.adminUserName})
            .exec()
            .then((result) =>{
            if(result.length<1){
           // console.log(req.body.adminUserName);
            return res.status(401).json({
                message:"Auth failed!"
               
            });
        }
        becrypt.compare(req.body.adminUserName,result[0].adminPassword,(err,done)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed!"
                });
                res.redirect('/');
            }
            if(done){
               var token= jwt.sign({
                    adminUserName:result[0].adminUserName,
                    adminID:result[0]._id,
                },
                "ahmed",
                {
                  expiresIn:'4w'
                }
                 
             );
             res.status(200).json({
                    token:token
                });
             res.redirect('/dashboard')
            // try {
            //     var decoded=jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJOYW1lIjoiYWhtZWQiLCJhZG1pbklEIjoiNWI1M2FmZjE5OTlmNzEzYWVjMTI2NjY4IiwiaWF0IjoxNTMyMjc5MDgwLCJleHAiOjE1MzIzMTUwODB9.UhFjFYVjsbGziHCMFYPxkxiWwwUVqnIplUZ0VvKX278', "ahmed");
            //      console.log(decoded.adminUserName);
            // } catch (error) {
            //     console.log(error);
            // }
                // return res.status(200).json({
                //     message:'Auth successful ',
                //     token:token
                // });
            }
            res.status(401).json({
                message:"Auth failed!"
            });
            res.redirect('/');
        });
        
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
module.exports=router;