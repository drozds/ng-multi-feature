import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, pluck, share, switchMap, tap, toArray } from 'rxjs/operators';

interface OpenWeatherResponse {
  list: {
    dt_txt: string,
    main: {
      temp: number
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getForecastData = () => {
    return this.getCurrentCoordinates().pipe(
      map(coords => new HttpParams()
        .set('lat', String(coords.latitude))
        .set('lon', String(coords.longitude))
        .set('units', 'metric')
        .set('appid', '033addb54a6a8f892dab1a284f1a73a5')
      ),
      switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
      pluck('list'),
      mergeMap(value => of(...value)),
      filter( (value, index) => index % 8 === 0 ),
      map(forecastItem => {
        return {
          dateStr: forecastItem.dt_txt,
          temp: forecastItem.main.temp
        }
      }),
      toArray(),
      share()
    )
  }

  getCurrentCoordinates = () => {
    return new Observable<{latitude: number, longitude: number}>(subscriber => {
      window.navigator.geolocation.getCurrentPosition(
        successResponse => {
          subscriber.next(successResponse.coords);
          subscriber.complete();
      },
        error => {
          subscriber.error(error);
      })
    })
  }
}
