const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const Assignment = require("../model/assignment.model");
const Course = require("../model/course.model");
const User = require("../model/user.model");






Router.get("/bycourse/:course", (req, res, next) => {

    Assignment.find().exec().then(docs => {

        const assignments = [];

        console.log(docs);

        docs.forEach(assignment => {
            if(assignment.course==req.params.course){
                console.log(assignment.course);
                console.log(req.params.course);
                assignments.push(assignment);
            }
        });

        res.status(200).json({
            assignments: assignments
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

Router.post('/',function(req,res){

    const assignment = new Assignment({
        name:req.body.name,
        publishDate:req.body.publishDate,
        DueDate:req.body.DueDate,
        allocatedMarks:req.body.allocatedMarks,
        course:req.body.course,
        file:req.body.file,
        markSheet:req.body.markSheet
    });

    console.log(assignment);    

    assignment.save().then(assi=>{
        res.status(200).send({message:"added successfully",data:assi});


        console.log(assi);

        Course.findById(assi.course).then(ins => {
            console.log(ins);
            console.log(ins.students);
           
            ins.students.forEach(sid=>{
                User.findById(sid).exec().then(student=>{
                    

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'it17106016railwayds@gmail.com', // Gmail user
                          pass: '17106016@IT' // Gmail password
                        }
        
                      });
                      let mailOptions = {
        
                        from: 'it17106016railwayds@gmail.com',
                        to: student.email,
                        subject: 'New Assignment !!!',
                        text: "Dear Student, Your Have A New Assignment. Upload Before "+req.body.DueDate+". Thank You. HAVE A GOOD DAY !",
        
        
                      };
        
                      transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                          return log('Error Occurs:', err)
                        }
                        console.log(`Email send to: ${result.email}`);
                      });
    




                });
            });
            

        }).catch(err2 => {
            res.status(400).send('adding new assignment failed');
        });

        
    }).catch(err=>{
        res.status(500).send({message:err});
    });
});





Router.get('/:id',function(req,res){
    Assignment.findById(req.params.id).then(data=>{
        res.status(200).send({data:data});
    }).catch(err=>{
        res.status(500).send({message:err});
    });
});

Router.put('/:id',function(req,res){
    Assignment.findById(req.params.id,function(err,assignment){
        if(err){
            res.status(500).send({message:err});
        }else{
            if(!assignment){
                res.status(404).send({message:"No data"});
            }else{
                console.log(req.body.filename)
                assignment.markSheet = req.body.filename

                assignment.save().then(data=>{

                    res.status(200).send({message:"added",data:data});


                    console.log(data);
                   

                    Course.findById(data.course).then(ins => {
                        console.log(ins);
                        console.log(ins.students);

                        ins.students.forEach(sid => {
                            User.findById(sid).exec().then(student => {


                                let transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'it17106016railwayds@gmail.com', // Gmail user
                                        pass: '17106016@IT' // Gmail password
                                    }

                                });
                                let mailOptions = {

                                    from: 'it17106016railwayds@gmail.com',
                                    to: student.email,
                                    subject: 'Assignment Mark Uploaded !!!',
                                    text: "Dear Student, Your " +data.name + " Assignment Marks Have Been Uploaded. Please Check. Thank You. HAVE A GOOD DAY !",


                                };

                                transporter.sendMail(mailOptions, (err, info) => {
                                    if (err) {
                                        return log('Error Occurs:', err)
                                    }
                                    console.log(`Email send to: ${result.email}`);
                                });





                            });
                        });


                    }).catch(err2 => {
                        res.status(400).send('adding assignment mark failed');
                    });

                            // var output=`<b>Assignment Results are out</b> 
                            // <p>Dear student , We kindly request you to check the website and download your assignment results.</p>`;

                            // let transporter = nodemailer.createTransport({
                            //         service: 'gmail',
                            //         secure: false,
                            //         port:25,
                            
                            //     auth: {
                            //             user: 'abccampus@gmail.com',
                            //             pass: 'acbcampus'
                            //     },
                            //     tls:{
                            //             rejectUnauthorized:false
                            //     }
                            // });
                            // let mailOptions = {
                            //             from: '"ABC Campus" <abccampus.org@gmail.com>',
                            //             to: 'email',
                            //             subject: 'Assignment Results',
                            //             text: 'Hello',
                            //             html: output
                            // };
                            // transporter.sendMail(mailOptions, (error, info) => {
                            //         if (error) {
                            //             return console.log(error);
                            //         }
                            //             console.log('Email sent: %s', info.messageId);
                            //             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            // });





                   
                }).catch(err=>{
                    res.status(500).send({message:err})
                });
            }
        }
    })
    
});



module.exports = Router;