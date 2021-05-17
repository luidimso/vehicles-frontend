import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFilterOptions } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.sevice';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

  @Output() filter:EventEmitter<any> = new EventEmitter<any>();

  filterOptions:IFilterOptions = {
    chassis: [],
    modelos: [],
    marcas: [],
    anos: []
  };

  selectedFilters:IFilterOptions = {
    chassis: [],
    modelos: [],
    marcas: [],
    anos: []
  }

  showFilterMobile:boolean = false;

  error:boolean = false;

  private unsub:Subscription[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.unsub.push(
      this.vehicleService.getFilterOptions().subscribe((response:IFilterOptions) => {
        this.filterOptions = response;
      }, (error) => {
        this.error = true;
      })
    );
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => u.unsubscribe());
  }

  sendFilter() {
    this.filter.emit(this.selectedFilters);
    this.showFilterMobile = false;
  }
}
