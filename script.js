const url = 'https://api.openweathermap.org/data/2.5/';
const key = process.env.API_KEY;

require('dotenv').config();

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    const cityName = searchBar.value.trim();
    if (cityName !== '') {
      updateWeatherAndBackground(cityName);
    }
  }
});

window.addEventListener('load', async () => {
    const randomCities = ['Istanbul', 'Ankara', 'Izmir']; 
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    await updateWeatherAndBackground(randomCity);
  });


const cityBackgrounds = {
    'İstanbul': 'istanbul.jpg',
    'Ankara': 'ankara.jpg',
    'İzmir': 'izmir.jpg',
  };

const setQuery = (e) =>{
    if(e.keyCode == '13'){
        getResult(searchBar.value);
        searchCityPhotos(searchBar.value);
    }
}

const getResult = (cityName) =>{
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query).then(weather => {
        return weather.json();
    })
    .then(displayResult)   
};

const displayResult = (result) =>{
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = `${result.weather[0].description}`;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;

    const cityName = result.name;
    const backgroundImage =  cityBackgrounds[cityName];

    if(backgroundImage){
        document.body.style.backgroundImage = `url('images/${backgroundImage}')`;
    }
} 

searchBar.addEventListener('keypress', setQuery)