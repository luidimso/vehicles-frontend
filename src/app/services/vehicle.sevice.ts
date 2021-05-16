import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map, shareReplay } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { IFilterOptions } from '../interfaces/vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private calling_timeout: number = 57000;

  constructor(
    private http: HttpClient
  ) { }

  getFilterOptions(): Observable<IFilterOptions> {
    return this.http.get<IFilterOptions>(env.VEHICLE_URL+"/filter/")
        .pipe(
            timeout(this.calling_timeout),
            map((obj) => obj),
            shareReplay(),
        );
  }
}
