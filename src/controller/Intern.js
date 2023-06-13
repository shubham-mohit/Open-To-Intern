
const InternModel = require('../model/Intern-model')
const validator = require('email-validator')
const collegeModel = require('../model/college-model')

const isValidValue = (value) => {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createIntern = async function (req,res){
    try {
    const Data = req.body
    let {name, email, mobile, collegeName } = Data
        if(!isValidValue(name) || (!name)) {return res.status(400).send({status:false,message:"Name is not provided"})}
        if(!isValidValue(email) || (!email)) {return res.status(400).send({status:false,message:"Email is not provided"})}
        if(!isValidValue(mobile) || (!mobile)) {return res.status(400).send({status:false,message:"Mobile Number is not provided"})}
        if(!isValidValue(collegeName)|| (!collegeName)) {return res.status(400).send({status:false,message:"CollegeName is not provided"})}
        if(!validator.validate(email)) {return res.status(400).send({status:false,message:"Email Id is not valid"})}
        const checkEmailExist = await InternModel.findOne({email:email})
        if(checkEmailExist) {return res.status(400).send({status: false ,message:"Email already in use"})}

        if( mobile.length != 10) {return res.status(400).send({status:false,message:"Mobile Number is not valid"})}
        const checkMobileExist =  await InternModel.findOne({ mobile :mobile})
        if(checkMobileExist) {return res.status(400).send({status:false,message:"Mobile Number already in use"})}

        const findcollege = await collegeModel.findOne({name : collegeName ,isDeleted : false})
        if(!findcollege) {return res.status(400).send({status:false,message:"Not such college found"})}
        const IDFORCOLLEGE = findcollege._id

        //  data.collegeId = IDFORCOLLEGE
        Data.collegeId = IDFORCOLLEGE
        let createIntern = await InternModel.create(Data)
        let Intern = await InternModel.findOne({email:email}).select({_id:0,name:1,email:1,mobile:1,collegeId:1,isDeleted:1})
        res.status(201).send({status:true, data : Intern})
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports.createIntern = createIntern