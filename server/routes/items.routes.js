const ItemController = require('../controllers/item.controller');

module.exports = (app) => {
    app.post('/api/items/', ItemController.createItem);
    app.get('/api/items/', ItemController.getAllItems);
    app.get('/api/items/:id', ItemController.getOneItem);
    app.put('/api/items/:id', ItemController.updateOneItem);
    app.delete('/api/items/:id', ItemController.deleteOneItem);
}