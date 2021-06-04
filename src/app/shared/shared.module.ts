import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationSearchComponent } from './location/location-search/location-search.component';
import { MaterialModule } from './material.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LocationSearchComponent
  ],
  exports: [
    LocationSearchComponent,
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule {}
