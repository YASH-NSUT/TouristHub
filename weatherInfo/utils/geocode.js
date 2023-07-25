const request = require("postman-request");

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYW1hbnBvcndhbDUxMCIsImEiOiJja2s0ZXR0MjIwZndtMnBxbmU1bGk5cDdqIn0.9e1R9KMgHuR2DMl4b3DlUg&limit=1";

    request({ url, json: true}, (error,response) => {
        if(error) {
            callback("Unable to connect with location services", undefined);
        }else if(response.body.features.length === 0) {
            callback("Unable to find lattitude and longitude of the location", undefined);
        }else {
            callback(undefined, {
                location : response.body.features[0].place_name,
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            } );
        }
    });
};

module.exports = geoCode;

/************************
    Future Reference
 ***********************/

 // const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=pk.eyJ1IjoiYW1hbnBvcndhbDUxMCIsImEiOiJja2s0ZXR0MjIwZndtMnBxbmU1bGk5cDdqIn0.9e1R9KMgHuR2DMl4b3DlUg&limit=1";
// // const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/24nkn.json?access_token=pk.eyJ1IjoiYW1hbnBvcndhbDUxMCIsImEiOiJja2s0ZXR0MjIwZndtMnBxbmU1bGk5cDdqIn0.9e1R9KMgHuR2DMl4b3DlUg&limit=1";
// request( {url : geoCodeUrl, json: true}, (error, response)=> {
//     if(error) {
//         console.log("Unable to connect with location services");
//     } else if(response.body.features.length === 0) {
//         console.log("Unable to find lattitude and longitude of the location");
//     }else {
//         console .log( "longitude : " ,response.body.features[0].center[0] );
//         console .log( "lattitude : " ,response.body.features[0].center[1] );
//     }
// });