const DistributorController = require('../controllers/distributor.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/distributors/', authenticate, DistributorController.createDistributor);
    app.get('/api/distributors/', DistributorController.getAllDistributors);
    app.get('/api/distributors/:id', DistributorController.getOneDistributor);
    app.put('/api/distributors/:id', authenticate, DistributorController.updateOneDistributor);
    app.delete('/api/distributors/:id', authenticate, DistributorController.deleteOneDistributor);
}