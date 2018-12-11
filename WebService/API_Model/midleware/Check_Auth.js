const jwt=require('jsonwebtoken');
module.exports=function(req,res,next){
    var token =req.body.token || req.param('token')|| req.headers['x-access-token'] ;
   // var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJOYW1lIjoiYWhtZWQiLCJhZG1pbklEIjoiNWI1M2FmZjE5OTlmNzEzYWVjMTI2NjY4IiwiaWF0IjoxNTMyMjc5MDgwLCJleHAiOjE1MzIzMTUwODB9.UhFjFYVjsbGziHCMFYPxkxiWwwUVqnIplUZ0VvKX278";
    try {
        var decoded=jwt.verify(token, "ahmed");//ahemd =>secret key
        req.decoded=decoded;
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(401).json({
            message:'Auth failed'
            
        })
    }
}