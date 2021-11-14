const mongoose = require('mongoose'); 

const uploadSchema = mongoose.Schema({
    name: String,
    emailId: String,
    title: String,
    uploadPersonType: String,
    address: String,
    phoneNo: Number,
    bedroom: Number,
    rent: Number,
    deposit: Number,
    desc: String,
    zone: String,
    apOrBung: String,
    images: [String],
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
        tv: Boolean
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const UploadSchema = mongoose.model('uploads', uploadSchema)

module.exports = { UploadSchema }
//export default ListSchema;