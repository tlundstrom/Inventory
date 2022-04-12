const Location = require('../models/location.model');
const jwt = require('jsonwebtoken');

module.exports = {
    createLocation : (req, res) => {
        const newLocationObject = new Location(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete:true
        })
        newLocationObject.createdBy = decodedJWT.payload.id;
        newLocationObject.save()
            .then(location => {
                return res.json(location)
            })
            .catch(err => {
                return res.status(400).json(err);
            })
        },

    getAllLocations : (req, res)=>{
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })
        Location.find({createdBy: decodedJWT.payload.id})
        .populate("createdBy", "name email")
            .then((locations)=>{
                res.json(locations)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding all the locations.", error: err})
            });
    },

    getOneLocation : (req, res) => {
        Location.findById(req.params.id)
            .then(location => {
                return res.json(location)
            })
            .catch(err => {
                return res.json({ message: "Something went wrong finding that location.", error: err})
            });
    },

    updateOneLocation : (req, res) => {
        console.log(req.body)
        Location.findByIdAndUpdate(
            req.params.id ,
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedLocation => {
                return res.json(updatedLocation)
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    },

    deleteOneLocation: (req, res) => {
        console.log(req.params.id);
        Location.deleteOne({_id: req.params.id})
            .then(deleted => {
                return res.json(deleted);
            })
            .catch(err => {
                return res.json({ message: "Something went wrong deleting that location.", error: err})
            });
    }
}