const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

const getGeoCode = _ => {
    if('geolocation' in navigator){
        console.log('geolocation available')
        navigator.geolocation.getCurrentPosition(position => {
            const { coords : { latitude,longitude } } = position;
            console.log(latitude,longitude);
          });
        navigator.geolocation.watchPosition(position => {
            const { coords : { latitude,longitude } } = position;
            console.log(latitude,longitude);
          },_,options)
    }
    else{
        console.log('geolocation not available')
    }
}

document.getElementById('geo-button').addEventListener('click',getGeoCode)

console.log(Geolocation.getCurrentPosition);