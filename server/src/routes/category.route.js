const router = require('express').Router();
const controller = require('../controllers/category.controller');
const auth = require('../utils/auth');

router.route('/').get(controller.findAll).post(auth.isAdmin, controller.create);

router
  .route('/:id')
  .get(controller.find)
  .put(auth.isAdmin, controller.update)
  .delete(auth.isAdmin, controller.delete);

module.exports = router;
