//import ListSchema from '../models/postMessage.js'
const { ListSchema } = require('../models/postMessage.js')

const getPosts = async (req, res) => {
    let sortObj = {
        rent: Number(req.query.rent)
    }
    try {
        let listings = []
        if (sortObj.rent === 0)
            listings = await ListSchema.find();
        else
            listings = await ListSchema.find().sort(sortObj);

        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

const createPost = async (req, res) => {
    const listing = {
        ...req.body,
        bedroom: Number(req.body.bedroom),
        rent: Number(req.body.rent),
        bathroom: Number(req.body.bathroom),
        furnishing: Number(req.body.furnishing),
        refId: Number(req.body.refId),
    }

    const newListing = new ListSchema(listing)
    try {
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

module.exports = { getPosts, createPost }