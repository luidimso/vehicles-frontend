import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.sevice';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.scss']
})
export class FormVehicleComponent implements OnInit, OnDestroy {

  @Input() vehicleToUpdate:IVehicle;
  @Output() updateVehicles:EventEmitter<IVehicle[]> = new EventEmitter<IVehicle[]>();

  vehicleForm = new FormGroup({
    placa: new FormControl('', Validators.compose([Validators.required, this.ValidateVehiclePlaca, Validators.maxLength(7)])),
    renavam: new FormControl('', Validators.compose([Validators.required])),
    ano: new FormControl('', Validators.compose([Validators.required, this.ValidateVehicleYear])),
    chassi: new FormControl('', Validators.compose([Validators.required])),
    modelo: new FormControl('', Validators.compose([Validators.required])),
    marca: new FormControl('', Validators.compose([Validators.required])),
  });
  formHasError:boolean = false;
  
  allBrands:string[] = env.VEHICLES_BRAND;

  private unsub:Subscription[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    if(this.vehicleToUpdate) {
      this.vehicleForm.get("placa").setValue(this.vehicleToUpdate.placa);
      this.vehicleForm.get("renavam").setValue(this.vehicleToUpdate.renavam);
      this.vehicleForm.get("ano").setValue(this.vehicleToUpdate.ano);
      this.vehicleForm.get("chassi").setValue(this.vehicleToUpdate.chassi);
      this.vehicleForm.get("modelo").setValue(this.vehicleToUpdate.modelo);
      this.vehicleForm.get("marca").setValue(this.vehicleToUpdate.marca);
    }
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => { u.unsubscribe() });
  }

  ValidateVehiclePlaca(control: AbstractControl): {[key: string]: any} | null  {
    var regex = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/img;
    if (!regex.test(control.value)) return { 'placaInvalid': true }
    return null
  }

  ValidateVehicleYear(control: AbstractControl): {[key: string]: any} | null  {
    if (isNaN(control.value) || Number(control.value) < 1950 || Number(control.value) > 2021) return { 'yearInvalid': true }
    return null
  }

  registerVehicle() {
    if(this.vehicleForm.valid) {
      this.formHasError = false;

      var newVehicle:IVehicle = {
        ano: this.vehicleForm.get("ano").value,
        chassi: this.vehicleForm.get("chassi").value,
        marca: this.vehicleForm.get("marca").value,
        modelo: this.vehicleForm.get("modelo").value,
        placa: this.vehicleForm.get("placa").value,
        renavam: this.vehicleForm.get("renavam").value,
      }

      this.unsub.push(
        this.vehicleService.postVehicle(newVehicle).subscribe((response:IVehicle[]) => {
          this.updateVehicles.emit(response);
        })
      );
    } else {
      this.formHasError = true;
    }
  }


  updateVehicle() {
    if(this.vehicleForm.valid) {
      this.formHasError = false;

      var newVehicle:IVehicle = {
        ano: this.vehicleForm.get("ano").value,
        chassi: this.vehicleForm.get("chassi").value,
        marca: this.vehicleForm.get("marca").value,
        modelo: this.vehicleForm.get("modelo").value,
        placa: this.vehicleForm.get("placa").value,
        renavam: this.vehicleForm.get("renavam").value,
      }

      this.unsub.push(
        this.vehicleService.updateVehicle(this.vehicleToUpdate.id, newVehicle).subscribe((response:IVehicle[]) => {
          this.updateVehicles.emit(response);
        })
      );
    } else {
      this.formHasError = true;
    }
  }


  closeForm() {
    this.updateVehicles.emit(null);
  }
}
