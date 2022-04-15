const LocationController = require('../controllers/location.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/locations/', authenticate, LocationController.createLocation);
    app.get('/api/locations/', authenticate, LocationController.getAllLocations);
    app.get('/api/locations/:id', authenticate, LocationController.getOneLocation);
    app.put('/api/locations/:id', authenticate, LocationController.updateOneLocation);
    app.delete('/api/locations/:id', authenticate, LocationController.deleteOneLocation);
}