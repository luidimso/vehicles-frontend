import { Component, Input, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/interfaces/vehicle.interface';

@Component({
  selector: 'app-modal-vehicle',
  templateUrl: './modal-vehicle.component.html',
  styleUrls: ['./modal-vehicle.component.scss']
})
export class ModalVehicleComponent implements OnInit {

  @Input() vehicle:IVehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
