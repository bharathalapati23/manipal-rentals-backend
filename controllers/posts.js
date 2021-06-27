//import ListSchema from '../models/postMessage.js'
const { ListSchema } = require('../models/postMessage.js')
var ObjectId = require('mongodb').ObjectID;

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
        deposit: Number(req.body.deposit),
        bathroom: Number(req.body.bathroom),
        furnishing: Number(req.body.furnishing),
        refId: Number(req.body.refId),
    }

    console.log(listing)

    const newListing = new ListSchema(listing)
    try {
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getSinglePost = async (req, res) => {
    let objId = req.query.objId

    try {
        let listing = []
        listing = await ListSchema.find({"_id" : ObjectId(objId)});

        res.status(200).json(listing);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

module.exports = { getPosts, createPost, getSinglePost }