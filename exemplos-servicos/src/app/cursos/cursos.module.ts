import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';

import {CursosService} from './cursos.service';
import { CursosComponent } from './cursos.component';

//cada serviço criado deve ir nos providers e será criada apenas um
//instancia de cada serviço (singleton)
@NgModule({
  declarations: [    
    CursosComponent
  ],
  imports: [
    CommonModule,    
  ],
//	providers: [CursosService],  
	exports: [CursosComponent]
})
export class CursosModule { }
