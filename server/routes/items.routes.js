const ItemController = require('../controllers/item.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/items/', authenticate, ItemController.createItem);
    app.get('/api/items/', authenticate, ItemController.getAllItems);
    app.get('/api/items/:id', authenticate, ItemController.getOneItem);
    app.put('/api/items/:id', authenticate, ItemController.updateOneItem);
    app.delete('/api/items/:id', authenticate, ItemController.deleteOneItem);
}