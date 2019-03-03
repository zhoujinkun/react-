import axios from 'axios';

let weatherMock = axios.create({
    url:"https://restapi.amap.com/v3/weather/weatherInfo?city=10000&key=9bfd1cf807d06ba5152fea6fa57df0e4"
})

export let getWeatherData = ()=>{
    return weatherMock.get('');
}