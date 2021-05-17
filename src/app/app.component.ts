import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'vehicles-frontend';

  smallHeader:boolean = false;

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

  filterVehicles(filter:any) {
    console.log(filter)
  }
}
