var jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,process.env.JWT_SECRET_KEY,function (err,decoded) {
        if(err){
            console.log(Token)
            res.status(401).json({status:"unauthorized"})
        }
        else {
            let email=decoded['data'];
            console.log(`request create by ${email}`)
            req.headers.email=email
            next();
        }
    })
}