const InternModel = require('../model/Intern-model')
const validator = require('email-validator')

const createIntern = async function (req,res){
    const Data = req.body
    let {name, email, mobile } = Data

    try {
        if(!name) {return res.status(400).send("Name is not provided")}
        if(!email) {return res.status(400).send("Email Id is not provided")}
        if(!mobile) {return res.status(400).send("Mobile is not provided")}

        if(!validator.validate(email)) {return res.status(400).send("Email Id is not valid")}
        const checkEmailExist = await InternModel.findOne({email:email})
        if(checkEmailExist) {return res.status(400).send("Email already in use")}

        if(! mobile.length == 10) {return res.status(400).send("Mobile Number is not valid")}
        const checkMobileExist =  await InternModel.findOne({ mobile :mobile})
        if(checkMobileExist) {return res.status(400).send("Mobile Number already in use")}

        let 
    } 
    catch (error) {
        
    }
}