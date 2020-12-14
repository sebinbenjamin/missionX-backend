const { Router } = require('express');
const { login, register, resetPassword } = require('../controllers/user.controller');

const router = Router();

// /api/user + /login
router.post('/login', login);

// /api/user + /register
router.post('/register', register);

// /api/user + /reset
router.post('/reset', resetPassword);

module.exports = router;
