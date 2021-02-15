const bcrypt = require('bcrypt');
module.exports = {
    encrypt:async(password)=>{ 
        const saltRounds = 10;   
        var salt = await bcrypt.genSalt(saltRounds);
        console.log(salt)
        var hash = await bcrypt.hash(password, salt);
       console.log(hash);
        return hash;
        
    },
    decryptAndCompare:async(password,hash)=>{
      var compare = await bcrypt.compare(password, hash);
        return compare;
    }


};