const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

const geoButton = document.getElementById('geo-button');  
const container = document.querySelector('.container');

const getGeoCode = (_ => {
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
            .then(_ => {
              if(container.getAttribute('dataispresent') === "false"){
                return location.reload();
              }
              return;
            })
            .catch(err => console.log(err))
          });
    }
    else{
        console.log('geolocation not available')
    } 
})()

geoButton.addEventListener('click',() => location.reload());

