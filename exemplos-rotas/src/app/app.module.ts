import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { ProfessoresModule } from './professores/professores.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';


//import { CursosComponent } from './cursos/cursos.component';
//import { routing } from './app.routing';
//import { CursosService } from './cursos/cursos.service';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
   // ProfessoresComponent,
/*     CursosComponent,
    CursoDetalheComponent,
    CursoNaoEncontradoComponent */
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,		
		//CursosModule,-comentado qdo usamos o LAZY LOADING (aula62) - aba Network do console do navegador - arquivo cursos-cursos-module.js
		//AlunosModule,-comentado qdo usamos o LAZY LOADING (aula62) - aba Network do console do navegador - arquivo alunos-alunos-module.js
		ProfessoresModule
  ],
  providers: [AuthService, AuthGuard, CursosGuard, AlunosGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
