import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CursosService} from './cursos/cursos.service';
import { CriarCursoModule } from './criar-curso/criar-curso.module';
import { CursosModule } from './cursos/cursos.module';
import { LogService } from './meus-servicos/log.service';

//cada serviço criado deve ir nos providers e será criada apenas um
//instancia de cada serviço (singleton)
//se eu tiver varios modulos q usam o provider CursosService, por ex
//, soh preciso q seja colocado como providers em um local. vai 
//depender do escopo da app
@NgModule({
  declarations: [
    AppComponent,
        
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		CriarCursoModule,
		CursosModule
  ],
  providers: [CursosService,LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
