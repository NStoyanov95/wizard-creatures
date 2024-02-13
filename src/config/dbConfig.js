const mongoose = require('mongoose');

const dbConfigurator = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/wizard-creatures');
};

module.exports = dbConfigurator;

