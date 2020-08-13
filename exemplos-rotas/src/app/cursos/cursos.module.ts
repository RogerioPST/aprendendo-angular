import { NgModule } from '@angular/core';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosService } from './cursos.service';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos.routing.module';

@NgModule({
  declarations: [
		CursosComponent,
		CursoDetalheComponent,
		CursoNaoEncontradoComponent
  ],
  imports: [
		CommonModule,		
//n precisa do RouterModule, pq ja esta sendo exportado pelo CursosRoutingModule
		CursosRoutingModule
  ],
  providers: [CursosService],
  
})
export class CursosModule { }
