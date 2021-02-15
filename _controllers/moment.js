var momentController = require('../_models/moment');
module.exports = {
    getAllMoments: async (req,res)=>{
        try {
            var getData = await momentController.find();
            if(getData){
                res.status(200).send(
                    {
                        status:1,
                        data:getData,
                        count:getData.length
                    }
                )
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    createMoment: async (req,res)=>{
        try {
            var create = new momentController({
                title:req.body.title,
                tags:req.body.tags,
                comment:req.body.comment,
                images:req.body.file,
                createdBy:req.body.auth
            })
            var save = await create.save();
            if(save){
                res.send({
                    status:1,
                    message:"moment created successfully"
                })
            }else{
                res.send({
                    status:0,
                    message:"Internal server error"
                })
            }
        } catch (error) {
           throw new Error(error); 
        }
    },
    editMoment: async (req,res)=>{
        try {
            var edit = await momentController.findByIdAndUpdate({_id:req.body._id},req.body.data);
            if(edit){
                res.send({
                    status:1,
                    message:"moment updated successfully"
                })
            }else{
                res.send({
                    status:0,
                    message:"Internal server error"
                })
            }
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteMoment:async (req,res)=>{
        try {
            var deleteData = await momentController.findByIdAndDelete({_id:req.params._id})
            if(deleteData){
                res.send({
                    status:1,
                    message:"moment deleted successfully"
                })
            }else{
                res.send({
                    status:0,
                    message:"Internal server error"
                })
            }

        } catch (error) {
            throw new Error(error);
        }
    },
    uploadFile: (req, res) => {
        let imgtype = ["image/png", "image/jpeg", "image/jpg"];
        if (!req.file) {
          res.status(500).send({ err: err });
        } else {
           var fileurl = `http://localhost:5000/${req.file.filename}`
          res.status(200).send({ message: "sucess", url: fileurl, file: req.file });
        }
      },
}