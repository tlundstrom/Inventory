const Distributor = require('../models/distributor.model')
const jwt = require('jsonwebtoken');

module.exports = {
    createDistributor : (req, res) => {
        const newDistributorObject = new Distributor(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete:true
        })
        newDistributorObject.createdBy = decodedJWT.payload.id;
        newDistributorObject.save()
            .then(distributor => {
                return res.json(distributor)
            })
            .catch(err => {
                return res.status(400).json(err);
            })
        },

    getAllDistributors : (req, res)=>{
        Distributor.find()
        .populate("createdBy", "name email")
            .then((distributors)=>{
                res.json(distributors)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding all the distributors.", error: err})
            });
    },

    getOneDistributor : (req, res) => {
        Distributor.findById(req.params.id)
            .then(distributor => {
                return res.json(distributor)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding that distributor.", error: err})
            });
    },

    updateOneDistributor : (req, res) => {
        console.log(req.body)
        Distributor.findByIdAndUpdate(
            req.params.id ,
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedDistributor => {
                return res.json(updatedDistributor)
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    },

    deleteOneDistributor: (req, res) => {
        console.log(req.params.id);
        Distributor.deleteOne({_id: req.params.id})
            .then(deleted => {
                return res.json(deleted);
            })
            .catch(err => {
                return res.json({ message: "Something went wrong deleting that distributor.", error: err})
            });
    }
}