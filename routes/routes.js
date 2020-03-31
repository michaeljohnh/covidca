const express = require('express');
const router = express.Router();
const ctrlLocations = require ('../controllers/locations');
const ctrlPlaces = require('../controllers/places');

// Hospitals
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance);

 router.route('/locations/:id')
       .get(ctrlLocations.locationsReadOne);

// Places

router
    .route('/places')
    .get(ctrlPlaces.places);

module.exports = router;