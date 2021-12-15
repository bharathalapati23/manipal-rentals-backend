const { google } = require("googleapis");
const creds = require('../googleCredentials.json')



async function gsrun(cl, req, res) {
    try {
        const gsapi = google.sheets({ version: "v4", auth: cl })
        const opt = {
            spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
            range: 'Enquiry!A:C'
        }

        let date = new Date()

        console.log(req.body.excelRow)

        if (!req.body.excelRow) {
            const excelObj = [
                date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
                req.body.name,
                req.body.contactNumber,
            ]

            await gsapi.spreadsheets.values.append({
                spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
                range: 'QR Code!A:C',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        excelObj
                    ]
                }
            }).then((response) => {
                console.log('response', response?.data?.updates?.updatedRange.slice(-2))
                res.send({ message: 'successful', excelRow: response?.data })
            })
        }
        else {
            const excelObj = [
                req.body.name,
                req.body.emailId,
                req.body.contactNumber,
                req.body.enquiryDesc,
                date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
            ]

            await gsapi.spreadsheets.values.update({
                spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
                range: `QR Code!D${req.body.excelRow}:H${req.body.excelRow}`,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        excelObj
                    ]
                }
            }).then((response) => {
                console.log('response', response)
                res.send({ message: 'successful' })
            })
        }

        
    }
    catch (error) {
        console.log(error)
    }

}

const postListingInfo = async (req, res) => {
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

module.exports = { postListingInfo }