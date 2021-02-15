var jwt = require('jsonwebtoken');

module.exports = function checkAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({
            message: 'Please make sure your request has an Authorization header'
        });
    }
    var token = req.header('Authorization').split(' ')[1];

    try{
        var payload = jwt.decode(token, 'YW5hbmRQamFndGFwOTU5NTA3MTgyOA==');
            console.log(payload)
            req.body.auth = payload;          
            next();
        
    }catch(err){
        return res.status(401).send({
            message: 'Token has expired'
        });
    }
  
   
}
