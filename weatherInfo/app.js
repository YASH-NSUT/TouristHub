const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const getWeatherInfo = function(address, callback) {
   
   if( !address ) {
      console.log("Please provide a address");
      return {};
   }else {
      geoCode(address, (error, {latitude, longitude, location} = {}) => {
         if(error) {
               console.log(error);
               return {};
         } else{
               forecast(latitude, longitude, (error, data = {}) => {
                  if(error) {
                     console.log(error);
                  }else {
                     callback(data)
                  }
               })
         }    
      });
   }
}

module.exports = getWeatherInfo