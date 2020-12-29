import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecasts$: Observable<{ dateStr: string, temp: number}[]>

  constructor(
    private forecastService: ForecastService
  ) { 
    this.forecasts$ = this.forecastService.getForecastData();
  }

  ngOnInit(): void {
  }

}
