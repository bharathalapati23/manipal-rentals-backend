import mongoose from 'mongoose'

const listSchema = mongoose.Schema({
    apOrBung: String,
    bathroom: Number,
    bedroom: Number,
    desc: String,
    rent: Number,
    images: [String],
    zone: String,
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

export default ListSchema;