const Location = require("../models/location.model");

module.exports = {
	createLocation: (req, res) => {
		const newLocationObject = new Location(req.body);

		newLocationObject.createdBy = req.jwtpayload.id;
		newLocationObject
			.save()
			.then((location) => {
				return res.json(location);
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	},

	getAllLocations: (req, res) => {
		Location.find({ createdBy: req.jwtpayload.id })
			.populate("createdBy", "name")
			.then((locations) => {
				res.json(locations);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding all the locations.", error: err });
			});
	},

	getOneLocation: (req, res) => {
		Location.findOne({ createdBy: req.jwtpayload.id, _id: req.params.id })
			.then((location) => {
				return res.json(location);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding that location.", error: err });
			});
	},

	updateOneLocation: (req, res) => {
		console.log(req.body);
		Location.findOneAndUpdate({ createdBy: req.jwtpayload.id, _id: req.params.id }, req.body, { new: true, runValidators: true })
			.then((updatedLocation) => {
				return res.json(updatedLocation);
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	},

	deleteOneLocation: (req, res) => {
		console.log(req.params.id);
		Location.deleteOne({ createdBy: req.jwtpayload.id, _id: req.params.id })
			.then((deleted) => {
				return res.json(deleted);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong deleting that location.", error: err });
			});
	},
};
