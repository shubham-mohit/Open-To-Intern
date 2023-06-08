// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    fullName : {
        type : String,
        required : true
    },
    logoLink : {
        required : true,
        type: String
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamp:true})


module.exports = mongoose.model("collegemodel", collegeSchema)