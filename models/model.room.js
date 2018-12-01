const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomNumber: Number,
    time: Date,
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'subject'
    }],
    group: [{
        type: Schema.Types.ObjectId,
        ref: 'group'
    }],
    teacher: [{
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    }]
});

const Room = mongoose.model('room', roomSchema);
module.exports = Room;