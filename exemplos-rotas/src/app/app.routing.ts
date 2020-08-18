import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { ModuleWithProviders } from '@angular/core';
import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';

/* const APP_ROUTES : Routes = [
	{path: '',component: HomeComponent},
	{path: 'login',component: LoginComponent},
	{path: 'cursos',component: CursosComponent},
	{path: 'curso/:id',component: CursoDetalheComponent},
	{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},
] */

//existe a opcao de forChild p casos especificos
//export const routing: ModuleWithProviders = RouterModule
//	.forRoot(APP_ROUTES)