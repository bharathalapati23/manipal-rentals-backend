const { UploadSchema } = require('../models/uploads.js')

const { google } = require("googleapis");
const creds = require('../googleCredentials.json')



async function gsrun(cl, req, id) {
    try {
        const gsapi = google.sheets({ version: "v4", auth: cl })
        let date = new Date()

        let homeFeatures = Object.keys(req.body.homeFeatures).filter((homeFeature) => {
            return req.body.homeFeatures[homeFeature]
        })

        // console.log(req.body.bedroomDetails)
        let bedroomFeaturesArr = req.body.bedroomDetails.map((bedroomFeatures) => {
            return Object.keys(bedroomFeatures).reduce((acc, feature) => {
                if (bedroomFeatures[feature])
                    return acc + feature + ','
                else
                    return acc
            }, '')
        })

        const excelObj = [
            date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
            id,
            req.body.name,
            req.body.emailId,
            req.body.uploadPersonType,
            req.body.address,
            req.body.phoneNo,
            req.body.title,
            req.body.desc,
            req.body.bedroom,
            req.body.rent,
            req.body.deposit,
            req.body.zone,
            req.body.apOrBung,
            homeFeatures.join(','),
            ...bedroomFeaturesArr
        ]

        await gsapi.spreadsheets.values.append({
            spreadsheetId: '1AWE6ozqebjsBDd1TKXY0Mo3dbZfU6zSkLjtvy-6hX5A',
            range: 'Unapproved Listings!A:N',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    excelObj
                ]
            }
        })
    }
    catch (error) {
        console.log(error)
    }

}


const getPosts = async (req, res) => {
    let sortObj = {
        rent: Number(req.query.rent)
    }
    try {
        let uploads = []
        if (sortObj.rent === 0)
            uploads = await UploadSchema.find().sort({ "createdAt": -1 });
        else
            uploads = await UploadSchema.find().sort(sortObj);

        res.status(200).json(uploads);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

const createPost = async (req, res) => {
    const upload = {
        ...req.body,
        bedroom: Number(req.body.bedroomDetails.length),
        rent: Number(req.body.rent),
        deposit: Number(req.body.deposit),
        bathroom: Number(req.body.bathroom),
    }



    const newUpload = new UploadSchema(upload)
    try {
        console.log('asdfdsf', newUpload)
        await newUpload.save();
        console.log('asdsd')
        res.status(201).json(newUpload);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

    try {
        const client = new google.auth.JWT(
            creds.client_email,
            null,
            creds.private_key,
            ['https://www.googleapis.com/auth/spreadsheets']
        )

        client.authorize(function (err, tokens) {
            if (err) {
                console.log(err)
                return
            } else {
                console.log('Connected')
                gsrun(client, req, newUpload._id)
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

module.exports = { getPosts, createPost }