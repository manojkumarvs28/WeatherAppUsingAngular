import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {
    apiKey = 'd0d05561695e5b01f24a377d11030327';
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric`;
    geoApiUrl = `https://spott.p.rapidapi.com/places/autocomplete?q=Haza&limit=5&type=CITY`;

    constructor(private httpClient: HttpClient) {}

    //Get the weather report of selected city
    getWeather(city:String) {
        return this.httpClient.get(`${this.apiUrl}&q=${city}`);
    }

    //Get the list of cities starting with entered prefix
    getCityNames(perfix:String) {
        return this.httpClient.get(
            `${this.geoApiUrl}&q=${perfix}`,
            {
                headers: {
                    'x-rapidapi-host': 'spott.p.rapidapi.com',
                    'x-rapidapi-key': 'EEEfKAkAYRmshOjhWYalF4rn9V3Fp1gxrcMjsnusBVWNZmicZ4'
                }
            })
    }
}