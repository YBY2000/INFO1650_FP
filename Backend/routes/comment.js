const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments');

router.get('/', controller.getComments);
router.post('/add', controller.addComment);
router.get('/updateStatus', controller.updateStatus);
module.exports = router;
