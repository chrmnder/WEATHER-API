let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById("temperature");
let description = document.querySelector('.description');
let clouds = document.querySelector('#clouds');
let humidity = document.querySelector('#humidity');
let pressure = document.querySelector('#pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value !== '') {
        searchWeather();
    }
});

let url = 'http://localhost:3000/weather?city=';

const searchWeather = () => {
    fetch(url + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';

                temperature.querySelector('img').src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
                temperature.querySelector('figcaption span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                if (clouds) clouds.innerText = data.clouds.all;
                if (humidity) humidity.innerText = data.main.humidity;
                if (pressure) pressure.innerText = data.main.pressure;
            } else {
                alert('Error: City not found');
            }

            valueSearch.value = '';
        })
        .catch(error => console.error("Fetch error:", error));
};

const initApp = () => {
    valueSearch.value = 'Cainta';
    searchWeather();
};
initApp();
