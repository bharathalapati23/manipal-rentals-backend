const { google } = require("googleapis");
const creds = require('../googleCredentials.json')



async function gsrun(cl, res) {
    try {
        const gsapi = google.sheets({ version: "v4", auth: cl })
        const opt = {
            spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
            range: 'Enquiry!A:C'
        }

        var data = await gsapi.spreadsheets.values.get(opt)
        console.log(data.data.values)

        await gsapi.spreadsheets.values.append({
            spreadsheetId: '182PlZIsi2YXCs5zeUSKuoS_KTxMu39_QT_BDOv3XqEo',
            range: 'Enquiry!A:C',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    ['Sampat3', '9876543210', 'sampat2@gmail', 'MIT', '543216', 'Testing 3', '1000', '100BHK']
                ]
            }
        })

        res.send({ message: 'successful'})
    }
    catch (error) {
        console.log(error)
    }

}

const postLeads = async (req, res) => {
    console.log(req.body)
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
                gsrun(client, res)
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

module.exports = { postLeads }