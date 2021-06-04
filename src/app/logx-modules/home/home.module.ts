import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OrderdetailsdialogComponent } from './orderdetailsdialog.component';
import { TrackOrderDetailsComponent } from './trackorderdetails.component';


@NgModule({
  declarations: [
    HomeComponent,
    OrderdetailsdialogComponent,
    TrackOrderDetailsComponent
  ],
  imports: [
      HomeRoutingModule, 
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
      CommonModule
    ],

  providers: []
})
export class HomeModule {}
