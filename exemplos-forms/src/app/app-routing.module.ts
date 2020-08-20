import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
import { DataFormAPartirBaseFormComponent } from './data-form-a-partir-base-form/data-form-a-partir-base-form.component';


const routes: Routes = [
	{ path: 'templateForm', component: TemplateFormComponent},
	{ path: 'dataForm', component: DataFormComponent},
	{ path: 'dataForm_a_partir_baseformcomponent', component: DataFormAPartirBaseFormComponent},
	{ path: '', pathMatch: 'full', redirectTo: 'dataForm'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
