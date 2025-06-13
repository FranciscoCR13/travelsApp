  import { HttpClient, HttpParams } from '@angular/common/http';
  import { inject, Injectable } from '@angular/core';
  import { environment } from '../environments/environment';
  import { Travel, TravelCreate } from './common/models/travel.models';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class TravelService {

    constructor() { }
    private http = inject(HttpClient);
    private URLbase = environment.apiURL + "/api/Travels";

    public getTravels(): Observable<Travel[]>{
      return this.http.get<Travel[]>(this.URLbase);
    }

    public getById(id: number): Observable<Travel>{
      return this.http.get<Travel>(`${this.URLbase}/${id}`);
    }

    public create(travel: TravelCreate){
      return this.http.post(this.URLbase, travel);
    }

    public update(id: number, travel: TravelCreate){
      return this.http.put(`${this.URLbase}/${id}`, travel);
    }

    public delete(id: number){
      return this.http.delete(`${this.URLbase}/${id}`);
    }

    public getTravelsFiltered(filters: {
      name?: string | null,
      originId?: number | null,
      destinationId?: number | null,
      operatorId?: number | null,
      statusId?: number | null,
      date?: string | null,
      sortColumn?: string,
      sortDirection?: 'asc' | 'desc'
    }): Observable<Travel[]> {
      let params = new HttpParams();

      if (filters.name) params = params.set('Name', filters.name);
      if (filters.originId !== null && filters.originId !== undefined) params = params.set('OriginId', filters.originId.toString());
      if (filters.destinationId !== null && filters.destinationId !== undefined) params = params.set('DestinationId', filters.destinationId.toString());
      if (filters.operatorId !== null && filters.operatorId !== undefined) params = params.set('OperatorId', filters.operatorId.toString());
      if (filters.statusId !== null && filters.statusId !== undefined) params = params.set('StatusId', filters.statusId.toString());
      if (filters.date) params = params.set('Date', filters.date);
      if (filters.sortColumn) params = params.set('OrderBy', filters.sortColumn);
      if (filters.sortDirection) params = params.set('OrderDir', filters.sortDirection);
      return this.http.get<Travel[]>(this.URLbase + '/filtered', { params });
    }
  }
