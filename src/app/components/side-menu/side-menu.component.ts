import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFilterOptions } from 'src/app/interfaces/vehicle.service';
import { VehicleService } from 'src/app/services/vehicle.sevice';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  filterOptions:IFilterOptions;

  private unsub:Subscription[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.unsub.push(
      this.vehicleService.getFilterOptions().subscribe((response:IFilterOptions) => {
        console.log(response);
      })
    );
  }

}
