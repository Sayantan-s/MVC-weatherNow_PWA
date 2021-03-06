let LatLongDataOfClient = null;

module.exports = class Weather {
    constructor(coords,weather,main,visibility,windSpeed,sys,placeName){
       this.coords = coords;
       this.weather = weather;
       this.main = main;
       this.visibility = visibility;
       this.wind = windSpeed;
       this.sys = sys;
       this.placeName = placeName

    }

    saveClientDataByLatLong(){
        LatLongDataOfClient = this;
    }
    
    static getDatabyLatLong(){
        return LatLongDataOfClient;
    }
}