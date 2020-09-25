import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  url = 'http://api.openweathermap.org/data/2.5/weather?&appid=';
  key = '8f8161f7df9f65b903d1b85adc323bff';

  constructor(private http: HttpClient) {}

  getClima(ciudad: string): Observable<any> {
    return this.http.get(this.url + this.key + '&q=' + ciudad + '&lang=es');
  }
}
