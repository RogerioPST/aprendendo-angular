import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos.service';
//para q eu possa modularizar, coloco o CursosComponent dentro
//do cursosModule
//e p poder usar esse Modulo fora, coloco o CursosComponent no
//exports
@NgModule({
	declarations: [
		CursosComponent,
		CursoDetalheComponent
	],
  imports: [
    CommonModule
	],
	exports: [
		CursosComponent,		
	],
	providers: [
		CursosService
	]
})
export class CursosModule { }
