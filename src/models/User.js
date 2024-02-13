const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please enter first name'],
        minLength: [3, 'First name should be at least 3 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name'],
        minLength: [3, 'Last name should be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        minLength: [10, 'Email should be at least 10 characters long']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [4, 'Password should be at least 4 characters long']
    }
})

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);    
});

userSchema.virtual('rePassword')
    .set(function(value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;