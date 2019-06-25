const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const AssignmentSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    publishDate:{
        type:String,
        required:true
    },
    DueDate:{
        type:String,
        required:true
    },
    allocatedMarks:{
        type:String,
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Course'
    },
    file:{
        type:String
    },
    markSheet:{
        type:String
    }

});

module.exports = Mongoose.model('Assignment', AssignmentSchema);