const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

const creatureService = require('../services/creatureService');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, ENV.SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuth = true;
        return next();

    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};

exports.isOwner = async (req, res, next) => {
    const creature = await creatureService.getOne(req.params.creatureId);

    const isOwner = creature.owner._id == req.user?._id;

    if (!isOwner) {
        return res.redirect('/404');
    }

   return next();

};

exports.isUser = async (req, res, next) => {
    const creature = await creatureService.getOne(req.params.creatureId).populate('votes');

    const isUser = creature.owner._id != req.user?._id;

    if (!isUser) {
        return res.redirect('/404');
    }

    const isVoted = creature.votes.some(x => x._id == req.user?._id);

    if (isVoted) {
        return res.redirect('/404')
    }

   return next();
}

exports.isGuest = (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next();
    }
    
    return res.redirect('/404');
}