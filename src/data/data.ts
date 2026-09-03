import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private apiUrl = "https://geo.ipify.org/api/v2/country?apiKey=at_2WpoDDqzF5U588gTqHX1VzQzOWFgu&ipAddress=8.8.8.8";

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }

}
