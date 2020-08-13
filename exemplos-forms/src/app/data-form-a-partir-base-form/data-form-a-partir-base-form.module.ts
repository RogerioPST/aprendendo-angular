import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataFormAPartirBaseFormComponent } from './data-form-a-partir-base-form.component';



@NgModule({
  declarations: [DataFormAPartirBaseFormComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule,		
		SharedModule,
		HttpClientModule
  ]
})
export class DataFormAPartirBaseFormModule { }
