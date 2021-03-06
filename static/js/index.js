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
            fetch('/weather-now',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({ latitude,longitude })
            })
            .then(res => res.json())
            .then(data => {
              return data.status && location.reload() 
            })
            .catch(err => console.log(err))
          });
    }
    else{
        console.log('geolocation not available')
    } 
}

document.getElementById('geo-button').addEventListener('click',getGeoCode);

