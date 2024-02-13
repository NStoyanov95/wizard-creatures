const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const creatureController = require('./controllers/creatureController');
const profileController = require('./controllers/profileController');

router.use(homeController);
router.use(profileController);
router.use('/auth', authController);
router.use('/creatures', creatureController);
router.all('*', (req,res)=>{
    res.redirect('/404');
})




module.exports = router;