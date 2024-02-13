const router = require('express').Router();

const { getErrorMessage } = require('../utils/errorUtils');

const {isAuth, isOwner, isUser} = require('../middlewares/authMiddleware');

const creatureService = require('../services/creatureService');

router.get('/create', isAuth, (req, res) => {
    res.render('creatures/create');
});

router.post('/create', isAuth, async (req, res) => {
    const creatureData = req.body;
    creatureData.owner = req.user._id;

    try {
        await creatureService.create(creatureData);
        res.redirect('/creatures/all-posts');
    } catch (error) {
        res.render('creatures/create', { error: getErrorMessage(error), ...creatureData });
    }
});

router.get('/all-posts', async (req, res) => {

    try {
        const creatures = await creatureService.getAll().lean();
        res.render('creatures/all-posts', { creatures });

    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:creatureId/details', async (req, res) => {

    try {
        const creature = await creatureService.getOne(req.params.creatureId).lean().populate('owner').populate('votes');
        const isUser = req.user?._id;
        const isOwner = creature.owner._id == req.user?._id;
        const isVoted = creature.votes.some(x => x._id == req.user?._id);
        const voteCount = creature.votes.length;
        const userVoted = creature.votes.map(x => x.email).join(', ')
        res.render('creatures/details', { creature, isUser, isOwner, voteCount, isVoted, userVoted });
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:creatureId/vote',isUser, async (req, res) => {
    try {
        await creatureService.vote(req.params.creatureId, req.user._id);
        res.redirect(`/creatures/${req.params.creatureId}/details`);
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:creatureId/delete',isOwner, async (req, res) => {
    try {
        await creatureService.delete(req.params.creatureId);
        res.redirect('/creatures/all-posts');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:creatureId/edit',isOwner, async (req, res) => {
    try {
        const creature = await creatureService.getOne(req.params.creatureId).lean();
        res.render('creatures/edit', { creature })
    } catch (error) {
        res.redirect('/404')
    }
});

router.post('/:creatureId/edit', async(req, res) => {
    const creature = req.body;
    try {
        await creatureService.update(req.params.creatureId, creature);
        res.redirect(`/creatures/${req.params.creatureId}/details`);
    } catch (error) {
        res.render('creatures/edit', {error: getErrorMessage(error), creature})
    }
})



module.exports = router;