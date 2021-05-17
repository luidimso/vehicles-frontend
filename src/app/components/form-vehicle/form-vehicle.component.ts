import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.scss']
})
export class FormVehicleComponent implements OnInit {

  vehicleForm = new FormGroup({
    placa: new FormControl('', Validators.compose([Validators.required, this.ValidateVehiclePlaca])),
    renavam: new FormControl('', Validators.compose([Validators.required])),
    ano: new FormControl('', Validators.compose([Validators.required, this.ValidateVehicleYear])),
    chassi: new FormControl('', Validators.compose([Validators.required])),
    modelo: new FormControl('', Validators.compose([Validators.required])),
    marca: new FormControl('', Validators.compose([Validators.required])),
  });
  formHasError:boolean = false

  constructor() { }

  ngOnInit(): void {
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
    } else {
      this.formHasError = true;
    }
  }
}
