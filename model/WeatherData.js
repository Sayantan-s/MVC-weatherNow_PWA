let LatLongDataOfClient = null;

const fetch = require('node-fetch');

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
    
    saveSearchedData(){
        console.log(this)
        LatLongDataOfClient = this;
    }

    static fetchDataServerside(uri,cb){
        return Promise.all([...uri].map(url => fetch(url)))
        .then(res => Promise.all(res.map(result => result.json())))
        .then(data => cb(data))
    }

    static getDatabyLatLong(){
        return LatLongDataOfClient;
    }
}