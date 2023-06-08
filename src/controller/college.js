const collegeModel = require('../model/college-model')
const validurl = require('valid-url')

const createcollege = async function(req,res) {
    const Data = req.body
    let {name, fullName, logoLink} = Data
    try {
        if(!name) {return res.status(400).send("Name is not provided")}
        if(!fullName) {return res.status(400).send("Fullname is not provided")}
        if(!logoLink) {return res.status(400).send("Logolink is nor provided")}
        if(!validurl.isWebUri(logoLink)) {return res.status(400).send("Please provid a valid URL")}
        else{
            const checkUnique = await collegeModel.findOne({name: name})
            if(checkUnique) {return res.status(400).send("Name already Exist")}
            else{
                const create = await collegeModel.create(Data)
                // res.status(201).send({status : true , Data : create})
                const send = await collegeModel.findOne({name : name}).select({_id:0,name:1,fullName:1,logoLink:1})
                res.status(201).send({status : true , Data: send})
            }
        }
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports.createcollege = createcollege