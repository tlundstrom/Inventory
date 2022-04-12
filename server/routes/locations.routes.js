const LocationController = require('../controllers/location.controller');

module.exports = (app) => {
    app.post('/api/locations/', LocationController.createLocation);
    app.get('/api/locations/', LocationController.getAllLocations);
    app.get('/api/locations/:id', LocationController.getOneLocation);
    app.put('/api/locations/:id', LocationController.updateOneLocation);
    app.delete('/api/locations/:id', LocationController.deleteOneLocation);
}