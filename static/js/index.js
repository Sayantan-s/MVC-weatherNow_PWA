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
            fetch('/',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({ latitude,longitude })
            })
            .then(res => console.log(res.json()))
            .catch(err => console.log(err))
          });
    }
    else{
        console.log('geolocation not available')
    } 

    window.location.href = '/';
}

document.getElementById('geo-button').addEventListener('click',getGeoCode)