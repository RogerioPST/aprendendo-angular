import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosGuard } from '../guards/alunos.guard';
import { AlunosDeactivateGuard } from '../guards/alunos.deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

//toda rota q for hard code, precisa ser avaliada primeiro,
//no caso, alunos/novo, pq se n, colide com a rota alunos/:id

//tambem existe o canActivateChild p ser usado aqui no path''
//qdo queremos q o componente pai e o filho estejam presentes 
//na mesma tela, eh um cenario p termos rotas filhas, como o
//'children' abaixo e colocar o '<router-outlet></router-outlet>'
//no AlunosComponent
const alunosRoutes = [
	{path: '', component: AlunosComponent, 
//como o ALunosGuard ja esta c provider no app.module, n precisa fazer 
//mais nd, mas caso quisessemos, poderiamos mover o arquivo p a pasta
//alunos, declarar como provider no alunos.module e ficar td 
//somente dentro do escopo da pasta alunos.

//com o ALunosGuard aqui, somente serah chamado se eu for em uma das
//rotas abaixo (children )	
	canActivateChild:[AlunosGuard],
	children: [
		{path: 'novo', component: AlunoFormComponent},
		{path: ':id', component: AlunoDetalheComponent,
			resolve:{alunoResolver: AlunoDetalheResolver}
		},
		{path: ':id/editar', component: AlunoFormComponent, 
		canDeactivate: [AlunosDeactivateGuard]
		},		
	]},
]

@NgModule({
	imports: [RouterModule.forChild(alunosRoutes)],
	exports: [RouterModule]

})

export class AlunosRoutingModule{}