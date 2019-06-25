const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ExamSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    },
    markSheet:{
        type:String
    }

});

module.exports = Mongoose.model('Exam', ExamSchema);