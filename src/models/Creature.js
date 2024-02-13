const mongoose = require('mongoose');


const creatureSchema = {
    name: {
        type: String,
        required: [true, 'Please enter name'],
        minLength: [2, 'Name should be at least 2 characters long']
    },
    species: {
        type: String,
        required: [true, 'Please enter species'],
        minLength: [3, 'Species should be at least 3 characters long']
    },
    skinColor: {
        type: String,
        required: [true, 'Please enter skin color'],
        minLength: [3, 'Skin color should be at least 3 characters long']
    },
    eyeColor: {
        type: String,
        required: [true, 'Please enter eye color'],
        minLength: [3, 'Eye color should be at least 3 characters long']
    },
    image: {
        type: String,
        required: [true, 'Please enter image'],
        match: [/^https?:\/\//, 'Image Url should start with http:// or https://']
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
        minLength: [5, 'Description should be at least 5 and no longer than 500 characters'],
        maxLength: [500, 'Description should be at least 5 and no longer than 500 characters']
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
};


const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;