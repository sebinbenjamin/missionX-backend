const { Router } = require('express');
const { get, getOne, update } = require('../controllers/project.controller');

const router = Router();

// GET /api/project + /
router.get('/', get);

// PATCH /api/project + /
router.patch('/', update);

// GET /api/project/ + :id/
router.get('/:id', getOne);

module.exports = router;
