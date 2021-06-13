const { google } = require("googleapis");
const creds = require('../googleCredentials.json')



async function gsrun(cl, req, res) {
    try {
        const gsapi = google.sheets({ version: "v4", auth: cl })
        const opt = {
            spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
            range: 'Enquiry!A:C'
        }

        var data = await gsapi.spreadsheets.values.get(opt)
        console.log(req.body)

        if (!req.body.contactUs) {
            const excelObj = [
                req.body.name,
                req.body.contactNumber,
                req.body.maxBudget,
                req.body.preferredZones.join(','),
                req.body.preferredConfig.join(','),
                req.body.enquiryDesc,
                req.body.preferredTime,
                req.body.searchId
            ]

            await gsapi.spreadsheets.values.append({
                spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
                range: 'Enquiry!A:C',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        excelObj
                    ]
                }
            })
        }
        else {
            const excelObj = [
                req.body.name,
                req.body.emailId,
                req.body.contactNumber,
                req.body.enquiryDesc,
            ]

            await gsapi.spreadsheets.values.append({
                spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
                range: 'Contact Us!A:C',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        excelObj
                    ]
                }
            })
        }

        res.send({ message: 'successful' })
    }
    catch (error) {
        console.log(error)
    }

}

const postLeads = async (req, res) => {
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
                gsrun(client, req, res)
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

module.exports = { postLeads }