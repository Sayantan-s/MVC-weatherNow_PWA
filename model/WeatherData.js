let LatLongDataOfClient = null;

module.exports = class Weather {
    constructor(coords,weather,main,visibility,windSpeed,sys,placeName,date){ 
       this.coords = coords;
       this.weather = weather;
       this.main = main;
       this.visibility = visibility;
       this.wind = windSpeed;
       this.sys = sys;
       this.placeName = placeName,
       this.date = date;
     }

    saveClientDataByLatLong(){
        LatLongDataOfClient = this;
        console.log(this);
    }
    
    static getDatabyLatLong(){
        return LatLongDataOfClient;
    }
}