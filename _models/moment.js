const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

var momentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:Array
    },
    comment:{
        type:String
    },
    images:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});
momentSchema.plugin(timeStamp);
module.exports = mongoose.model('moment',momentSchema);