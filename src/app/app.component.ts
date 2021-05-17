import { Component, OnInit } from '@angular/core';
import { IFilterOptions } from './interfaces/vehicle.interface';

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
}
