// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}


const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const InternSchema = new mongoose.Schema({
    name : {
        types : String,
        required : true,
    },
    email : {
        types : String,
        unique : true,
        required: true
    },
    mobile : {
        types : Number,
        unique : true,
    },
    collegeId : {
        types : ObjectId,
        ref : "collegemodel"
    },
    isDeleted : {
        types : Boolean,
        default : false
    }
},{timestamp : true})

module.exports = mongoose.model("Intern-Model", InternSchema)