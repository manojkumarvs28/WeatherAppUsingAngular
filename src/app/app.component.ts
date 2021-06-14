import { Component } from '@angular/core';
import { WeatherService } from 'src/common/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'weatherApp';
  selectedCity: String = null;
  minTemp: number = null;
  maxTemp: number = null;
  feelsLike: number= null;
  windSpeed: number = null;
  temp: number=null;
  description : String = null;
  message: String = null;
  isError: boolean= false;
  cities: string[];

  constructor(private weatherService: WeatherService) {}

  onSelectingCity= (cityPrefix:any) => {
    console.log(cityPrefix);
    this.getCities(cityPrefix);
  }

  setWeatherData=(weatherData) => {
    const {main, weather, wind} = weatherData;
    this.minTemp = Math.round(main.temp_min);
    this.maxTemp = Math.round(main.temp_max);
    this.feelsLike = Math.round(main.feels_like);
    this.windSpeed = Math.round(wind.speed);
    this.temp = Math.round(main.temp);
    this.description = weather[0].description;
  }

  onKeyUp = (citySelected:string) => {
    console.log(citySelected);
    this.selectedCity = citySelected;
    this.getTempearture(this.selectedCity);
  }

  getTempearture = (citySelected) => {
    this.weatherService.getWeather(citySelected).subscribe((weatherData) => {
        this.setWeatherData(weatherData);
    })
  }

  getCities = (cityPrefix: String) => {
    if(cityPrefix.length <3) {
      this.message = 'Please type 3 or more characters to search';
      this.isError = true;
      this.selectedCity = null;
    } else {
      this.weatherService.getCityNames(cityPrefix).subscribe((cities: string[]) => {
        if(cities.length === 0) {
          this.isError = true;
          this.message = "No cities found with this prefix";
          this.setCities([]);
          return;
        }  
        this.isError = false;
        this.message = '';
        this.setCities(cities);   
      })
    }
  }

  setCities= (cityList):void => { 
    this.cities = cityList.map(city => `${city.name}, ${city.country.id}`);
  }

}
