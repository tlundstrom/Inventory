const DistributorController = require('../controllers/distributor.controller');

module.exports = (app) => {
    app.post('/api/distributors/', DistributorController.createDistributor);
    app.get('/api/distributors/', DistributorController.getAllDistributors);
    app.get('/api/distributors/:id', DistributorController.getOneDistributor);
    app.put('/api/distributors/:id', DistributorController.updateOneDistributor);
    app.delete('/api/distributors/:id', DistributorController.deleteOneDistributor);
}