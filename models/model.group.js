const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: String,
    dateStart: String,
    dateEnd: String,
    faculty: [{
        type: Schema.Types.ObjectId,
        ref: 'faculty'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'lesson'
    }]
});

const Group = mongoose.model('group', groupSchema);
module.exports = Group;