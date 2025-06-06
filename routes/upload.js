const express = require('express');
const multer = require('multer');

const router = express.Router();

const uploadController = require('../controllers/upldctrl');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), uploadController.handleUpload);

module.exports = router;
