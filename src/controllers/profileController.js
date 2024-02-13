const router = require('express').Router();

const creatureService = require('../services/creatureService');

const {isAuth} = require('../middlewares/authMiddleware');

router.get('/profile/:userId', isAuth, async (req, res) => {

    try {
        const posts = await creatureService.getOneForUser(req.params.userId).lean();
        res.render('my-posts', { posts });
        
    } catch (error) {
        res.redirect('/404');
    }
});


module.exports = router;