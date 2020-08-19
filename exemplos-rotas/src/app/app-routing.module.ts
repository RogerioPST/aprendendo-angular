import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ProfessoresComponent } from './professores/professores.component';
/* import { CursosComponent } from './cursos/cursos.component';
import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
 */

 /*Para carregamento lazy/ sob demanda, são tres passos:
1. usar no app.routing.module.ts de onde estava sendo importado, no caso, no app.module.ts.
"
{path: 'cursos', loadChildren: 'app/cursos/cursos.module#CursosModule'}
"
2.retirar o import de CursosModule do app.module.ts ou de qq outro 
arquivo
3. no cursos.routing.module.ts, mudar o path 'cursos' p '', pois o 
path 'cursos' ja esta no loadChildren.*/
const appRoutes : Routes = [
//path dos cursos e alunos carregados com LAZY LOADING
	{path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
	canActivate: [AuthGuard],
	canActivateChild:[CursosGuard],
	canLoad: [AuthGuard]	
	},
	{path: 'alunos', loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
	canActivate: [AuthGuard],
	canLoad: [AuthGuard]
	//canActivateChild:[AlunosGuard]
	},
	{path: 'login',component: LoginComponent},	
	{path: 'home',component: HomeComponent, canActivate:[AuthGuard]},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: '**',component: PaginaNaoEncontradaComponent, canActivate:[AuthGuard]},
	/* {path: 'cursos',component: CursosComponent},
	{path: 'curso/:id',component: CursoDetalheComponent},
	{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent}, */
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
