const { Router } = require('express');
const { get, getOne, update } = require('../controllers/project.controller');

// const express = require('express');
// const router = express.Router();
const router = Router(); // Express router instance

// GET /api/project + /
router.get('/', get);

// GET /api/project + /specialProject
router.get('/specialProject', get);

// PATCH /api/project + /
router.patch('/', update);

// GET /api/project/ + :id/
router.get('/:id', getOne);

module.exports = router;
