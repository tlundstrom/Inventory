const Item = require('../models/item.model');



module.exports = {
    
    createItem : (req, res) => {
        const newItemObject = new Item(req.body);
        newItemObject.createdBy = req.jwtpayload.id;
        newItemObject.save()
            .then(item => {
                return res.json(item)
            })
            .catch(err => {
                return res.status(400).json(err);
            })
        },

    getAllItems : (req, res)=>{
        Item.find({createdBy: req.jwtpayload.id})
        .populate("createdBy", "name")
            .then((items)=>{
                res.json(items)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding all the items.", error: err})
            });
    },

    getOneItem : (req, res) => {
        Item.findOne({createdBy: req.jwtpayload.id}&&{_id:req.params.id})
        .populate("createdBy", "name")
            .then(item => {
                return res.json(item)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding that item.", error: err})
            });
    },

    updateOneItem : (req, res) => {
        console.log(req.body)
        Item.findOneAndUpdate(
            {createdBy: req.jwtpayload.id}&&{_id:req.params.id} ,
            req.body,
            { new: true, runValidators: true }
        )
        .populate("createdBy", "name")
            .then(updatedItem => {
                return res.json(updatedItem)
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    },

    deleteOneItem: (req, res) => {
        console.log(req.params.id);
        Item.deleteOne({createdBy: req.jwtpayload.id}&&{_id:req.params.id})
            .then(deleted => {
                return res.json(deleted);
            })
            .catch(err => {
                return res.json({ message: "Something went wrong deleting that item.", error: err})
            });
    }
}