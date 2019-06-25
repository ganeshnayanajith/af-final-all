const Express = require("express");
const Router = Express.Router();
const Mongoose = require("mongoose");

const nodemailer = require("nodemailer");

const Exam = require("../model/exam.model");
const Course = require("../model/course.model");
const User = require("../model/user.model");


Router.get("/bycourse/:course", (req, res, next) => {

    Exam.find().exec().then(docs => {

        const exams = [];

        console.log(docs);

        docs.forEach(exam => {
            if (exam.course == req.params.course) {
                console.log(exam.course);
                console.log(req.params.course);
                exams.push(exam);
            }
        });

        res.status(200).json({
            exams: exams
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

Router.post("/add", (req, res, next) => {
    const exam = new Exam({
        name: req.body.name,
        date: req.body.date,
        venue: req.body.venue,
        course: req.body.course,
        markSheet: req.body.markSheet
    });

    exam.save().then(exam => {
        res.status(200).json({ 'exam': 'exam added successfully' });

        console.log(exam);

        Course.findById(exam.course).then(ins => {
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
                        subject: 'New Exam !!!',
                        text: "Dear Student, Your Have A New Exam on " + req.body.date + " at " + req.body.venue + ". Thank You. HAVE A GOOD DAY !",


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
            res.status(400).send('adding new exam failed');
        });


    }).catch(err => {
        res.status(400).send('adding new exam failed');
    });
});

Router.put('/:id', function (req, res) {
    Exam.findById(req.params.id, function (err, exam) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (!exam) {
                res.status(404).send({ message: "No data" });
            } else {
                console.log(req.body.filename)
                exam.markSheet = req.body.filename

                

                exam.save().then(exam => {

                   

                    res.status(200).send({ message: "added", data: exam });



                    console.log(exam);
                   

                    Course.findById(exam.course).then(ins => {
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
                                    subject: 'Exam Mark Uploaded !!!',
                                    text: "Dear Student, Your " +exam.name + " Exam Marks Have Been Uploaded. Please Check. Thank You. HAVE A GOOD DAY !",


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
                        res.status(400).send('adding exam mark failed');
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






                }).catch(err => {
                    res.status(500).send({ message: err })
                });
            }
        }
    })

});

module.exports = Router;