const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = {
    'normal': { can: [] },
    'admin': { can: ['read'] },
    'superadmin': { can: ['read', 'write'] },
}

const userSchema = new Schema({
    firstName: String,
    lastName:  String,
    isAdmin: Boolean,
    password: String
});

const User = mongoose.model('user', userSchema);
module.exports = User;