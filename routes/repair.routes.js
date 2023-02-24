const { Router } = require('express');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { validIfExistRepair } = require('../middlewares/repair.middlewares');
const {check} = require('express-validator');


const router = Router();

router.get('/', findAllRepairs);

router.get('/:id', validIfExistRepair, findOneRepair);

router.post('/', 
[
  check('date', 'The Date is required').not().isEmpty(),
  check('motorsNumber', 'The MotorsNumber is required').not().isEmpty(),
  check('description', 'The Description is required').not().isEmpty(),
  check('userId', 'The UserId is required').not().isEmpty(),
  validIfExistRepair,
],
 createRepair);

router.patch('/:id', validIfExistRepair, updateRepair);

router.delete('/:id', validIfExistRepair, deleteRepair);

module.exports = {
  repairRouter: router,
};
