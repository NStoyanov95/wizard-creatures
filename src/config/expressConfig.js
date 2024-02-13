const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/authMiddleware');

const expressConfigurator = (app) => {
    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(authMiddleware.auth);
}


module.exports = expressConfigurator;