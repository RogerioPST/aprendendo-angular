import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';

import {CursosService} from '../cursos/cursos.service';
import { CriarCursoComponent } from './criar-curso.component'
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

//cada serviço criado deve ir nos providers e será criada apenas um
//instancia de cada serviço (singleton)
@NgModule({
  declarations: [    
		CriarCursoComponent,
		ReceberCursoCriadoComponent
  ],
  imports: [
    CommonModule,    
  ],
//	providers: [CursosService],  
	exports: [CriarCursoComponent]
})
export class CriarCursoModule { }
