const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstName: String,
    lastName: String,
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }]
});

const Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;