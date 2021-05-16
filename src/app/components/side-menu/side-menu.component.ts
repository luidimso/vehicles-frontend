import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFilterOptions } from 'src/app/interfaces/vehicle.service';
import { VehicleService } from 'src/app/services/vehicle.sevice';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

  filterOptions:IFilterOptions = {
    chassis: [],
    modelos: [],
    marcas: [],
    anos: []
  };

  private unsub:Subscription[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.unsub.push(
      this.vehicleService.getFilterOptions().subscribe((response:IFilterOptions) => {
        this.filterOptions = response;
      })
    );
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => u.unsubscribe());
  }
}
