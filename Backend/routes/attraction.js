const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/attraction');

router.get('/getAll', AttractionController.getAllAttractions);
router.get('/get', AttractionController.getAttractionDetail);

module.exports = router;
