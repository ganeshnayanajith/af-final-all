const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const SubmissionAssignmentSchema = new Schema({

    assignmentId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Assignment'
    },
    studentId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    lastUpdated:{
        type:Date,
        required:true
    },
    filePath:{
        type:String,
        required:true
    }

});

module.exports = Mongoose.model('SubmitedAssignment', SubmissionAssignmentSchema);