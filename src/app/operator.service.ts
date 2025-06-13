import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/Operators';

  public getOperator(){
    return this.http.get<any>(this.URLbase);
  }

  getActiveOperator() {
    return this.http.get<any[]>(`${this.URLbase}?isActive=true`);
  }

  getOperatorsForEdit(includeId?: number): Observable<any[]> {
    const url = includeId 
      ? `${this.URLbase}?isActive=true&includeId=${includeId}`
      : `${this.URLbase}?isActive=true`;
    return this.http.get<any[]>(url);
  }
}
