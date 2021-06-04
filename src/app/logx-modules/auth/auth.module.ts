import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent 
  ],
  imports: [
   FormsModule,
   ReactiveFormsModule,
   AuthRoutingModule,
   MaterialModule,
   CommonModule,
   SharedModule
  ],
  providers: [ ]
})
export class AuthModule { }
