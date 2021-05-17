import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  @Input() set show(value:boolean) {
    this.showModal = value;
  }

  showModal:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
