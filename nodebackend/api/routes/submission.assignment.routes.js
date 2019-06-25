const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");

const Submission = require("../model/submission.assignment.model");



Router.post('/',function(req,res){

    const submission = new Submission({
        assignmentId:req.body.assId,
        studentId:req.body.stdId,
        lastUpdated:req.body.date,
        filePath:req.body.file
    });

    submission.save().then(data=>{
        res.status(200).send({message:"added successfully",data:data});
    }).catch(err=>{
        res.status(500).send({message:err});
    });
});

Router.put('/:id',function(req,res){
    Submission.findById(req.params.id,function(err,submission){
        if(err){
            res.status(500).send({message:err});
        }else{
            if(!submission){
                res.status(404).send({message:"No data"});
            }else{
                submission.lastUpdated = req.body.date;
                submission.filePath = req.body.file;

                submission.save().then(data=>{
                    res.status(200).send({message:'successfully added',data:data});
                }).catch(err=>{
                    res.status(500).send({message:err});
                });
                
            }
        }
    });
});


Router.get('/',function(req,res){
    Submission.find().then(data=>{
        res.status(200).send({data:data});
    }).catch(err=>{
        res.status(500).send({message:err});
    });
});


Router.get('/:id',function(req,res){
    Submission.find({assignmentId:req.params.id},function(err,submission){
        if(err){
            res.status(500).send({message:err});
        }else{
            if(!submission){
                res.status(404).send({message:"No data"});
            }else{
                res.status(200).send({data:submission});
            }
        }
    });
});

Router.get('/:stId/:asId',function(req,res){
    Submission.findOne({assignmentId:req.params.asId,studentId:req.params.stId},function(err,submission){
        if(err){
            res.status(500).send({message:err});
        }else{
            if(!submission){
                res.status(404).send({message:"No data"});
            }else{
                res.status(200).send({data:submission});
            }
        }
    });
});







module.exports = Router;