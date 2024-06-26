import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpapiService {

  constructor(private http: HttpClient) {}

  getNewsData(ImageType:string) {
    const API_KEY = '44521966-f31aca2565349e6f3dba0dffc'; // Get your API key from NewsAPI.org
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${ImageType}&per_page=90`;
    return this.http.get(URL);
  }
}
