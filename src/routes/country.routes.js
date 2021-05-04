const { Router } = require('express');

const { getAllCountries, getCountry } = require('../controllers/country.controller');

const router = Router();

// /api/country + /
router.get('/', getAllCountries);

// /api/country/AWB
router.get('/:code', getCountry);

// router.get('/profilePic/:id', getProfilePic);

module.exports = router;
