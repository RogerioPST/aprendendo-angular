import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form.component';
import { FormDebugComponent } from '../shared/form-debug/form-debug.component';
import { CampoControlErroComponent } from '../shared/campo-control-erro/campo-control-erro.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';



@NgModule({
	declarations: [TemplateFormComponent,		
		
	],
  imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		SharedModule
  ]
})
export class TemplateFormModule { }
