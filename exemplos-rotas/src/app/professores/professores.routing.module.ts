import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ProfessoresComponent } from './professores.component';
import { ProfessorDetalheComponent } from './professor-detalhe/professor-detalhe.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';

//toda rota q for hard code, precisa ser avaliada primeiro,
//no caso, Professores/novo, pq se n, colide com a rota Professores/:id

//tambem existe o canActivateChild p ser usado aqui no path''
const professoresRoutes = [
	{path: 'professores', component: ProfessoresComponent},
	{path: 'professores/novo', component: ProfessorFormComponent},
	{path: 'professores/:id', component: ProfessorDetalheComponent},
	{path: 'professores/:id/editar', component: ProfessorFormComponent},		
]

@NgModule({
	imports: [RouterModule.forChild(professoresRoutes)],
	exports: [RouterModule]

})

export class ProfessoresRoutingModule{}