const multer = require('multer');
const { Router } = require('express');

const storage = multer.memoryStorage();
const uploadMemory = multer({ storage: storage });

const {
  login,
  register,
  resetPassword,
  uploadProfilePic,
  getProfilePic,
} = require('../controllers/user.controller');

const router = Router();

// /api/user + /login
router.post('/login', login);

// /api/user + /register
router.post('/register', register);

// /api/user + /reset
router.post('/reset', resetPassword);

// /api/user + /profilePic
router.put('/profilePic', uploadMemory.single('profilePic'), uploadProfilePic);
router.get('/profilePic', getProfilePic);

module.exports = router;
