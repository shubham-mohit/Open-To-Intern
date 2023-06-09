// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}


const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const InternSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required: true
    },
    mobile : {
        type: String,
        unique : true,
        required: true
    },
    collegeId : {
        type : ObjectId,
        ref : "collegemodel",
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{timestamp : true})

module.exports = mongoose.model("Intern-Model", InternSchema)