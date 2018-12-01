const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    lessonName: String,
    time: String,
    group: [{
        type: Schema.Types.ObjectId,
        ref: 'group'
    }],
    teacher: [{
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    }],
    room: [{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }]
});

const Lesson = mongoose.model('lesson', lessonSchema);
module.exports = Lesson;