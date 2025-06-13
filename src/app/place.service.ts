import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/Places';

  public getPlace(){
    return this.http.get<any>(this.URLbase);
  }

  getActivePlaces() {
    return this.http.get<any[]>(`${this.URLbase}?isActive=true`);
  }

  getPlacesForEdit(includeId?: number): Observable<any[]> {
    const url = includeId
      ? `${this.URLbase}?isActive=true&includeId=${includeId}`
      : `${this.URLbase}?isActive=true`;
    return this.http.get<any[]>(url);
  }
}
