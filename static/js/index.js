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
            document.querySelector('.lat').textContent = latitude.toFixed(2);
            document.querySelector('.long').textContent = longitude.toFixed(2);
            fetch('/',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({ nigga : "Hello" })
            })
            .then(res => console.log(res.json()))
            .catch(err => console.log(err))
          });
    }
    else{
        console.log('geolocation not available')
    }
}

document.getElementById('geo-button').addEventListener('click',getGeoCode)