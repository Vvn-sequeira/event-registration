const mongoose = require("mongoose");
const {Schema} = mongoose;


const Registration = new Schema({
    Name:{
        type: String ,
        required : true 
    },
    RegNo:{
        type : Number,
        required : true 
    },
    PhoneNo:{
        type : Number,
        required : true 
    },
    Email:{
        type : String,
        required : true 
    },
    College:{
        type : String,
        default: "St Alloysius (Deemed to be University"
    },
    Class:{
        type : String,
        required : true 
    },
    ImgURL:{
        type : String,
        required : true 
    },
    Size:{
        type : String,
        required : true 
    },

})

const registrationMODLE = mongoose.model("Registration", Registration);

module.exports = registrationMODLE;
