import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, map, shareReplay } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { IFilterOptions, IVehicle } from '../interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private calling_timeout: number = 57000;

  constructor(
    private http: HttpClient
  ) { }

  getVehicles(): Observable<IVehicle[]> {
    return this.http.get<IVehicle[]>(env.VEHICLE_URL)
        .pipe(
            timeout(this.calling_timeout),
            map((obj) => obj),
            shareReplay(),
        );
  }

  getFilterOptions(): Observable<IFilterOptions> {
    return this.http.get<IFilterOptions>(env.VEHICLE_URL+"/filter/")
        .pipe(
            timeout(this.calling_timeout),
            map((obj) => obj),
            shareReplay(),
        );
  }

  postVehicle(vecicle:IVehicle): Observable<IVehicle[]> {
    return this.http.post<IVehicle[]>(env.VEHICLE_URL, vecicle)
        .pipe(
            timeout(this.calling_timeout),
            map((obj) => obj),
            shareReplay(),
        );
  }

  updateVehicle(id:number, vecicle:IVehicle): Observable<IVehicle[]> {
    return this.http.put<IVehicle[]>(env.VEHICLE_URL+"/"+id, vecicle)
        .pipe(
            timeout(this.calling_timeout),
            map((obj) => obj),
            shareReplay(),
        );
  }

  deleteVehicle(id:number): Observable<IVehicle[]> {
    return this.http.delete<IVehicle[]>(env.VEHICLE_URL+"/"+id)
        .pipe(
            timeout(this.calling_timeout),
            map((obj) => obj),
            shareReplay(),
        );
  }
}
