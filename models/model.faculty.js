const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    facultyName: String,
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'group'
    }]
});

const Faculty = mongoose.model('faculty', facultySchema);
module.exports = Faculty;