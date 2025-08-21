const express = require('express');
const router = express.Router();
const { login, register, getProfile, updateProfile } = require('../controllers/UsersCotrollers');
const authenticated = require('../middlewares/Authencated');

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authenticated, getProfile);
router.put('/profile', authenticated, updateProfile);

module.exports = router;