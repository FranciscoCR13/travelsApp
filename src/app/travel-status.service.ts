import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TravelStatusService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + "/api/TravelStatus";

  public getTravelStatus() {
    return this.http.get<any>(this.URLbase);
  }
}
