const Distributor = require("../models/distributor.model");

module.exports = {
	createDistributor: (req, res) => {
		const newDistributorObject = new Distributor(req.body);
		newDistributorObject.createdBy = req.jwtpayload.id;
		newDistributorObject
			.save()
			.then((distributor) => {
				return res.json(distributor);
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	},

	getAllDistributors: (req, res) => {
		Distributor.find({ createdBy: req.jwtpayload.id })
			.populate("createdBy", "name")
			.then((distributors) => {
				res.json(distributors);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding all the distributors.", error: err });
			});
	},

	getOneDistributor: (req, res) => {
		Distributor.findOne({ createdBy: req.jwtpayload.id, _id: req.params.id })
			.populate("createdBy", "name")
			.then((distributor) => {
				console.log(req.params.id);
				return res.json(distributor);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong finding that distributor.", error: err });
			});
	},

	updateOneDistributor: (req, res) => {
		console.log(req.body);
		Distributor.findOneAndUpdate({ createdBy: req.jwtpayload.id, _id: req.params.id }, req.body, { new: true, runValidators: true })
			.populate("createdBy", "name")
			.then((updatedDistributor) => {
				return res.json(updatedDistributor);
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	},

	deleteOneDistributor: (req, res) => {
		console.log(req.params.id);
		Distributor.deleteOne({ createdBy: req.jwtpayload.id, _id: req.params.id })
			.then((deleted) => {
				return res.json(deleted);
			})
			.catch((err) => {
				return res.status(400).json({ message: "Something went wrong deleting that distributor.", error: err });
			});
	},
};
