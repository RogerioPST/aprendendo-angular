import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosListaComponent } from './cursos/cursos-lista/cursos-lista.component';


const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'busca-reativa'},
	{
		path: 'cursos',
		loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
	},
	{
		path: 'upload',
		loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
	},
  {
		path: 'rxjs-poc',
		loadChildren: () => import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(m => m.UnsubscribeRxjsModule)    
  }	 ,
  {
		path: 'busca-reativa',
		loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)    
  }	  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
