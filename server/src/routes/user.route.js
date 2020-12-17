const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/user.middleware');
const auth = require('../utils/auth');

router.get('/session', controller.session);

router.post(
  '/register',
  middleware.registrationRules,
  auth.validate,
  controller.register
);
router.post(
  '/login',
  middleware.loginRules,
  auth.validate,
  passport.authenticate('local'),
  controller.login
);
router.post('/logout', controller.logout);

router.post('/favorite/:id', auth.isMe, controller.addFavorite);
router.put('/favorite/:id', auth.isMe, controller.removeFavorite);

router
  .route('/:id')
  .get(auth.isMe, controller.findMine)
  .delete(auth.isMe, controller.delete);

module.exports = router;
