var registerModel = require('../_models/user');
var encryptDecrypt = require('../_helpers/encrypt_decrypt');
var jwt = require('jsonwebtoken');
var secret = 'YW5hbmRQamFndGFwOTU5NTA3MTgyOA==';
module.exports = {
    userRegister:async (req,res)=>{
        try {
           var pass = await encryptDecrypt.encrypt(req.body.password);
            const saveData = new registerModel({
                firstName:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:pass,
                city:req.body.city,
                mobile:req.body.mobile
            })
           var save = await saveData.save();
           if(save){
               res.send({
                   status:1,
                   message:"user save successfully"
               })
           }else{
               res.send({
                   status:0,
                   message:"Internal server error"
               })
           }
        } catch (error) {
            throw new Error(error);
        }
    },
    userLogin:async (req,res)=>{
        try {
            var user = await registerModel.findOne({
                email:req.body.email
            });

            if(user){
                
                if(await encryptDecrypt.decryptAndCompare(req.body.password,user.password)){
                    //create token
                    var token = await jwt.sign({ _id:user._id }, secret);
                    var data = {
                        name:user.name,
                        email:user.email,
                        city:user.city,
                    };

                    res.send({
                       status:1,
                       auth:token,
                       user:data
                    })
                }else{
                    res.send({
                        status:0,
                        message:'Enter Valid Password'});
                }
            }else{
                res.send({status:0,
                    message:'User not Found'});

            }
        } catch (error) {
            throw new Error(error);
        }
    }

}
