module.exports.logConverter=(req,res)=>{

    console.log(req.body);
    return res.json({message:"ok hai"})
}