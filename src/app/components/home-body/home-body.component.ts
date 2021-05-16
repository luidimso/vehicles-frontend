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

  private unsub:Subscription[] = [];

  constructor(
    private vehicleServive: VehicleService
  ) { }

  ngOnInit(): void {
    this.unsub.push(
      this.vehicleServive.getVehicles().subscribe((response:IVehicle) => {
        console.log(response)
      })
    );
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => u.unsubscribe());
  }

}
