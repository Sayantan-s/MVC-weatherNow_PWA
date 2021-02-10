let LatLongDataOfClient = null;

module.exports = class Weather {
    constructor(weather,main,visibility,windSpeed,sys,placeName){
       this.weather = weather;
       this.main = main;
       this.visibility = visibility;
       this.wind = windSpeed;
       this.sys = sys;
       this.placeName = placeName

    }

    saveClientDataByLatLong(){
        LatLongDataOfClient = this;
        console.log(this);
    }
    
    static getDatabyLatLong(){
        return LatLongDataOfClient;
    }
}