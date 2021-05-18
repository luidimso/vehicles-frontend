import { Component, OnInit } from '@angular/core';
import { IFilterOptions, IVehicle } from './interfaces/vehicle.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'vehicles-frontend';

  smallHeader:boolean = false;
  filter:IFilterOptions;
  showForm:boolean = false;
  showBody:boolean = true;
  vehicleToUpdate:IVehicle;

  constructor() {}

  ngOnInit() {
    window.onscroll = () => { this.checkScroll(); };
  }

  checkScroll() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      this.smallHeader = true;
    } else {
      this.smallHeader = false;
    }
  }

  filterVehicles(filter:IFilterOptions) {
    this.filter = null;
    setTimeout(() => {
      this.filter = filter;
    })
  }

  updateVehicles(vehicles:IVehicle[]) {
    this.vehicleToUpdate = null;
    
    if(vehicles) {
      this.showForm = false;
      this.showBody = false;
      setTimeout(() => {
        this.showBody = true;
      }, 500);
    } else {
      this.showForm = false;
    }
  }

  openFormToUpdate(vehicle:IVehicle) {
    this.vehicleToUpdate = vehicle;
    this.showForm = true;
  }
}
