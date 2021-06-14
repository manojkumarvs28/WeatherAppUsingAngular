import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:'app-temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit{

    @Input() minTemp: number;
    @Input() maxTemp:number;
    @Input() feelsLike: number;
    @Input() windSpeed: number;
    @Input() selectedCity: String;
    @Input() temp: number;

   constructor() {}

   ngOnInit(): void {

   }

}