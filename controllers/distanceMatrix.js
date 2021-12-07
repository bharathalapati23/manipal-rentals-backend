var axios = require('axios');

const locationInfo = [
    {
        name: "Coin Circle",
        coordinates: '13.359049723709468%2C74.785188454355'
    },
    {
        name: "Syndicate Circle",
        coordinates: '13.347171646653694%2C74.78405422122559'
    },
    {
        name: "MIT Main Gate",
        coordinates: '13.353145949981956%2C74.79144438319094'
    },
    {
        name: "KMC Greens",
        coordinates: '13.352968136723435%2C74.7871749685341'
    },
    {
        name: "DOC",
        coordinates: '13.343127822019504%2C74.79519802366686'
    },
    {
        name: "Dee Tee",
        coordinates: '13.355246071038632%2C74.79804202737098'
    },
    {
        name: "Manipal Lake",
        coordinates: '13.340249149918131%2C74.7857487276441'
    },
    {
        name: "TAPMI",
        coordinates: '13.325576%2C74.803691'
    }
]

const distanceCalculatorGoogle = async (coordinates) => {
    //let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=13.347224830042446%2C74.79176422805796&destinations=13.34291%2C74.785639&key=AIzaSyCTSha9Eyy1pEbcgVOJtgUPzS - OezK5IQA'
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${coordinates}&destinations=`

    for (let i = 0; i < locationInfo.length; i++) {
        url += locationInfo[i].coordinates
        if (url != locationInfo.length - 1)
            url += '%7C'
    }

    url += '&key=AIzaSyCTSha9Eyy1pEbcgVOJtgUPzS - OezK5IQA'

    //console.log(url)

    var config = {
        method: 'get',
        //url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998&destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyCTSha9Eyy1pEbcgVOJtgUPzS - OezK5IQA',
        url,
        headers: {}
    };

    let manipalDistanceMatrix = []
    await axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data.rows));
            for (let i = 0; i < response.data.rows[0].elements.length; i++) {
                manipalDistanceMatrix.push({
                    name: locationInfo[i].name,
                    distance: response.data.rows[0].elements[i].distance.text
                })
            }
            //console.log('manipal', manipalDistanceMatrix)
        })
        .catch(function (error) {
            console.log(error);
            return null
        });

    //console.log('x', manipalDistanceMatrix)
    return manipalDistanceMatrix
}

module.exports = { distanceCalculatorGoogle }