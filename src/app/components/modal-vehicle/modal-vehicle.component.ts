import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.sevice';

@Component({
  selector: 'app-modal-vehicle',
  templateUrl: './modal-vehicle.component.html',
  styleUrls: ['./modal-vehicle.component.scss']
})
export class ModalVehicleComponent implements OnInit, OnDestroy {

  @Input() vehicle:IVehicle;
  @Output() close:EventEmitter<IVehicle> = new EventEmitter<IVehicle>();

  private unsub:Subscription[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => { u.unsubscribe() });
  }

  updateVehicle() {
    this.close.emit(this.vehicle);
  }

  closeModal() {
    this.close.emit(null);
  }

  deleteVehicle() {
    this.unsub.push(
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe((response:IVehicle[]) => {
        this.closeModal();
      })
    );
  }
}
