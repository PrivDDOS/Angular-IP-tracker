import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLocations(userIp: string = ""): Observable<any> {
    const url = `${this.apiUrl}?${this.apiKey}`
    return this.http.get<any>(url)
  }

}
