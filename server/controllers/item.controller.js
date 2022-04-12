const Item = require('../models/item.model');
const jwt = require('jsonwebtoken');



module.exports = {
    
    createItem : (req, res) => {
        const newItemObject = new Item(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete:true
        })
        newItemObject.createdBy = decodedJWT.payload.id;
        newItemObject.save()
            .then(item => {
                return res.json(item)
            })
            .catch(err => {
                return res.status(400).json(err);
            })
        },

    getAllItems : (req, res)=>{
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })
        Item.find({createdBy: decodedJWT.payload.id})
        .populate("createdBy", "name email")
            .then((items)=>{
                res.json(items)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding all the items.", error: err})
            });
    },

    getOneItem : (req, res) => {
        Item.findById(req.params.id)
            .then(item => {
                return res.json(item)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding that item.", error: err})
            });
    },

    updateOneItem : (req, res) => {
        console.log(req.body)
        Item.findByIdAndUpdate(
            req.params.id ,
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedItem => {
                return res.json(updatedItem)
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    },

    deleteOneItem: (req, res) => {
        console.log(req.params.id);
        Item.deleteOne({_id: req.params.id})
            .then(deleted => {
                return res.json(deleted);
            })
            .catch(err => {
                return res.json({ message: "Something went wrong deleting that item.", error: err})
            });
    }
}