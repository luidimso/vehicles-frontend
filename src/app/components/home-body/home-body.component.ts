import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFilterOptions, IVehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.sevice';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss']
})
export class HomeBodyComponent implements OnInit, OnDestroy {

  @Input() set filter(value:IFilterOptions) {
    //Toda vez que os valores dos filtros selecionados mudarem, é executado uma sequência de 'ifs' para buscar os veículos que tenham algum dos valores selecionados nos filtros
    if(value) {
      this.vehicles = this.vehiclesAux;

      if(value.chassis.length > 0) {
        this.vehicles = this.vehicles.filter((vehicle) => {
          return value.chassis.includes(vehicle.chassi);
        });
      }
      if(value.modelos.length > 0) {
        this.vehicles = this.vehicles.filter((vehicle) => {
          return value.modelos.includes(vehicle.modelo);
        });
      }
      if(value.marcas.length > 0) {
        this.vehicles = this.vehicles.filter((vehicle) => {
          return value.marcas.includes(vehicle.marca);
        });
      }
      if(value.anos.length > 0) {
        this.vehicles = this.vehicles.filter((vehicle) => {
          return value.anos.includes(vehicle.ano);
        });
      }

      this.vehiclesAuxForFilter = this.vehicles;
    }
  }
  @Output() updateVehicle:EventEmitter<IVehicle> = new EventEmitter<IVehicle>();

  vehicles:IVehicle[] = [];
  vehiclesAux:IVehicle[] = [];
  vehiclesAuxForFilter:IVehicle[] = [];

  selectedVehicle:IVehicle;

  error:boolean = false;

  private unsub:Subscription[] = [];

  constructor(
    private vehicleServive: VehicleService
  ) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => u.unsubscribe());
  }

  getVehicles() {
    this.unsub.push(
      this.vehicleServive.getVehicles().subscribe((response:IVehicle[]) => {
        this.vehicles = response.reverse();
        this.vehiclesAux = this.vehicles;
        this.vehiclesAuxForFilter = this.vehiclesAux;
      }, (error) => {
        this.error = true;
      })
    );
  }

  searchVehicles(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicles = this.vehiclesAuxForFilter;

    if (filterValue && filterValue.trim() !== '') {
      this.vehicles = this.vehicles.filter((fide) => {
        return (fide.chassi.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.marca.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.modelo.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.placa.toLowerCase().indexOf(filterValue.toLowerCase())>-1 ||
          fide.renavam.toLowerCase().indexOf(filterValue.toLowerCase())>-1
        );
      });
    }
  }

  selectVehicle(vehicle:IVehicle) {
    this.selectedVehicle = vehicle;
  }

  closeModalVehicle(vehicle:IVehicle|string) {
    //Se ao fechar o modal do veículo, o valor retornado do output do componente for um veículo, envia esse veículo para o formulário para poder ser atualizado
    //Se o retorno for igual a string 'deleted', então o veículo foi excluido, o que faz uma nova consulta para pegar os veículos no backend
    //Se o retorno for nulo, não faça nada
    if(vehicle && vehicle != "deleted") {
      this.selectedVehicle = null;
      this.updateVehicle.emit(<IVehicle>vehicle);
    } else if(vehicle && vehicle == "deleted") {
      this.selectedVehicle = null;
      this.getVehicles();
    } else {
      this.selectedVehicle = null;
    }
  }
}
