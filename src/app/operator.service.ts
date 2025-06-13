import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

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
}
