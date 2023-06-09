const InternModel = require('../model/Intern-model')
const validator = require('email-validator')
const collegeModel = require('../model/college-model')

const createIntern = async function (req,res){
    const Data = req.body
    let {name, email, mobile, collegeName } = Data

    try {
        if(!name) {return res.status(400).send("Name is not provided")}
        if(!email) {return res.status(400).send("Email Id is not provided")}
        if(!mobile) {return res.status(400).send("Mobile is not provided")}
        if(!collegeName) {return res.status(400).send("Colege Name is required")}

        if(!validator.validate(email)) {return res.status(400).send("Email Id is not valid")}
        const checkEmailExist = await InternModel.findOne({email:email})
        if(checkEmailExist) {return res.status(400).send("Email already in use")}

        if( mobile.length != 10) {return res.status(400).send("Mobile Number is not valid")}
        const checkMobileExist =  await InternModel.findOne({ mobile :mobile})
        if(checkMobileExist) {return res.status(400).send("Mobile Number already in use")}

        const findcollege = await collegeModel.findOne({name : collegeName})
        if(!findcollege) {return res.status(400).send("Not such college found")}
        const IDFORCOLLEGE = findcollege._id

        //  data.collegeId = IDFORCOLLEGE
        Data.collegeId = IDFORCOLLEGE
        let createIntern = await InternModel.create(Data)
        res.send({data : createIntern})
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports.createIntern = createIntern