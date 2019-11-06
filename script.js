var weatherApp = {
    appId: '95746ae9011e3403e5897c8de081f593',
    units:'imerial',
    searchMethod: '',

    initialize() {
        document.getElementById('weatherButton').addEventListener( 'click', this.input )
    },

    input() {
        let searchTerm = document.getElementById('searchTerm').value;
        weatherApp.searchWeather( searchTerm );
    },

    searchWeather( searchTerm ) {
        this.getSearchMethod( searchTerm );
        fetch(`https://api.openweathermap.org/data/2.5/weather?${this.searchMethod}=${searchTerm}&APPID=${this.appId}`).then(response => {
            return response.json();
        }).then( response => {
            this.setResponse( response );
        } );
    },

    getSearchMethod( searchTerm ) {
        if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm )
            this.searchMethod = 'zip'
        else
            this.searchMethod = 'q'
    },

    setResponse( response ) {

        let result = response.weather[0].main;

        switch(result) {
            case 'Clear':
                document.body.style.backgroundImage ='url("images/clear.jpg")';
            break;

            case 'Clouds':
                document.body.style.backgroundImage ='url("images/cloude.jpg")';
            break;

            case 'Rain':
            case 'Drizzle':
            case 'Mist':
                document.body.style.backgroundImage ='url("images/rain.jpg")';
            break;

            case 'Thunderstrom':
                document.body.style.backgroundImage ='url("images/storm.jpg")';
            break;

            case 'Snow':
                document.body.style.backgroundImage ='url("images/snow.jpg")';
            break;

            default:
                document.body.style.backgroundImage ='url("images/default.jpg")';
            break;
        }

        let city_name           = document.getElementById('city_name')
        let temp_section        = document.getElementById('temp')
        let description_section = document.getElementById('description')
        let icon_section        = document.getElementById('icon_section')
        let wind_section        = document.getElementById('wind')
        let humidity_section    = document.getElementById('humidity')

        city_name.innerHTML           = response.name
        temp_section.innerHTML        = Math.floor(response.main.temp) + '&#176';
        description_section.innerHTML = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1)
        icon_section.src              = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`
        wind_section.innerHTML        = 'Winds at ' + response.wind.speed + ' m/s'
        humidity_section.innerHTML    = 'Humidity levels at ' + response.main.humidity + '%'
    }
}

weatherApp.initialize();