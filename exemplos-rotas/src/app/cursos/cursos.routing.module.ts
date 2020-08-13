import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosGuard } from '../guards/cursos.guard';
import { AuthGuard } from '../guards/auth.guard';
/*Para carregamento lazy/ sob demanda, são tres passos:
1. usar no app.routing.module.ts de onde estava sendo importado, no caso, no app.module.ts.
"
{path: 'cursos', loadChildren: 'app/cursos/cursos.module#CursosModule'}
"
2.retirar o CursosModule do app.module.routing.ts ou de qq outro 
arquivo
3. no cursos.routing.module.ts, mudar o path 'cursos' p '', pois o 
path 'cursos' ja esta no loadChildren.
tambem existe o canActivateChild p ser usado aqui no path''
*/
const cursosRoutes : Routes = [		
	{path: '',component: CursosComponent,},
	{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},
	{path: ':id',component: CursoDetalheComponent},
]

//esse tb eh chamado de modulo de funcionalidade/separado da app
//principal
//quando se faz um modulo de rotas separado do principal, como 
//eh o caso desse cursos.routing.module, coloca-se forChild ao
//inves de forRoot, q somente eh usado no modulo raiz da aplicacao
@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
