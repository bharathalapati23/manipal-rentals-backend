const mongoose = require('mongoose'); 

const listSchema = mongoose.Schema({
    refId: Number,
    title: String,
    apOrBung: String,
    bathroom: Number,
    bedroom: Number,
    desc: String,
    rent: Number,
    deposit: Number,
    images: [String],
    zone: String,
    active: Boolean,
    bedroomDetails: [{
        singleBed: Boolean,
        doubleBed: Boolean,
        wardrobe: Boolean,
        studyTable: Boolean,
        chair: Boolean,
        attachedToilet: Boolean,
        attachedBalcony: Boolean,
        airConditioner: Boolean,
    }],
    homeFeatures: {
        wifi: Boolean,
        geyser: Boolean,
        washingMachine: Boolean,
        cookingHub: Boolean,
        fridge: Boolean,
        couch: Boolean,
        coffeeTable: Boolean,
        chairs: Boolean,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const ListSchema = mongoose.model('Listing', listSchema)

module.exports = { ListSchema }
//export default ListSchema;