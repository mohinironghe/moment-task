const mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamp');

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String
    },
    mobile:{
        type:Number
    }
});
userSchema.plugin(timeStamps);
module.exports = mongoose.model('user',userSchema)