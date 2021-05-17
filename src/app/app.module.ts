import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HomeBodyComponent } from './components/home-body/home-body.component';
import { ModalVehicleComponent } from './components/modal-vehicle/modal-vehicle.component';
import { FormVehicleComponent } from './components/form-vehicle/form-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HomeBodyComponent,
    ModalVehicleComponent,
    FormVehicleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
