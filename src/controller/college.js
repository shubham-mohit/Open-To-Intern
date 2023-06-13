const InternModel = require('../model/Intern-model')
const collegeModel = require('../model/college-model')
const validurl = require('valid-url')

const isValidValue = (value) => {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createcollege = async function(req,res) {
    const Data = req.body
    let {name, fullName, logoLink} = Data
    try {
        if(!isValidValue(name) || (!name)) {return res.status(400).send({state:false, message: "Name is not provided"})}
        if(!isValidValue(fullName) || (!fullNmae)) {return res.status(400).send({state:false, message: "FullName is not provided"})}
        if(!isValidValue(logoLink) || (!logoLink)) {return res.status(400).send({state:false, message: "Logolink is not provided"})}
        if(!validurl.isWebUri(logoLink)) {return res.status(400).send("Please provid a valid URL")}
        else{
            const checkUnique = await collegeModel.findOne({name: name})
            if(checkUnique) {return res.status(400).send({status:false,message:"Name already Exist"})}
            else{
                const create = await collegeModel.create(Data)
                // res.status(201).send({status : true , Data : create})
                // const send = await collegeModel.findOne({name : name}).select({_id:0,name:1,fullName:1,logoLink:1,isDeleted:1})
                let {name,fullName,logoLink,isDeleted} = create
                let send = {name,fullName,logoLink,isDeleted} 
                res.status(201).send({status : true , Data: send})
            }
        }
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
}


const getInternData = async function(req,res){
    let DataFromParam = req.query.collegeName
    const checkData = await collegeModel.findOne({name : DataFromParam})
    if(! checkData) {return res.status(404).send({status:false,message:"College not found"})}
    else{
        let collegeIdFromCheckData = checkData._id
        const findIntern = await InternModel.find({collegeId : collegeIdFromCheckData}).select({id_:1,name:1,email:1,mobile:1})
        // console.log(findIntern)
        if(! findIntern) {return res.status(400).send({status:false, message:"No one is applied for this college"})}
        else{
               Data = {
                name : checkData.name,
                fullName : checkData.fullName,
                logoLink: checkData.logoLink,
                Interns : findIntern
               }
        }
        res.status(200).send({status:true, Data : Data})
    }

}

module.exports.createcollege = createcollege
module.exports.getInternData = getInternData