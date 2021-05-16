import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/vehicle.service';
import { VehicleService } from 'src/app/services/vehicle.sevice';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss']
})
export class HomeBodyComponent implements OnInit, OnDestroy {

  vehicles:IVehicle[] = [];
  vehiclesAux:IVehicle[] = [];

  private unsub:Subscription[] = [];

  constructor(
    private vehicleServive: VehicleService
  ) { }

  ngOnInit(): void {
    this.unsub.push(
      this.vehicleServive.getVehicles().subscribe((response:IVehicle[]) => {
        this.vehicles = response;
        this.vehiclesAux = this.vehicles;
      })
    );
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => u.unsubscribe());
  }

  searchVehicles(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicles = this.vehiclesAux;

    if (filterValue && filterValue.trim() !== '') {
      this.vehicles = this.vehicles.filter(function(fide) {
        return (fide.chassi.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.marca.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.modelo.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.placa.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.renavam.toLowerCase().indexOf(filterValue.toLowerCase())>-1
        );
      });
    }
  }

}
