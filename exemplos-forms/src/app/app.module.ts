import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { TemplateFormModule } from './template-form/template-form.module';
import { FormDebugComponent } from './shared/form-debug/form-debug.component';
import { CampoControlErroComponent } from './shared/campo-control-erro/campo-control-erro.component';
import { DataFormModule } from './data-form/data-form.module';
import { DataFormAPartirBaseFormComponent } from './data-form-a-partir-base-form/data-form-a-partir-base-form.component';
import { DataFormAPartirBaseFormModule } from './data-form-a-partir-base-form/data-form-a-partir-base-form.module';

@NgModule({
  declarations: [
    AppComponent,    		 	
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule, 
		TemplateFormModule,		
		DataFormModule,
		DataFormAPartirBaseFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
