import { NgModule } from "@angular/core";
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ProfessoresComponent } from './professores.component';
import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { ProfessorDetalheComponent } from './professor-detalhe/professor-detalhe.component';
import { ProfessoresRoutingModule } from './professores.routing.module';
import { ProfessoresService } from './professores.service';

@NgModule({
	declarations:[ProfessoresComponent, ProfessorFormComponent, ProfessorDetalheComponent
		
	],
	imports: [ CommonModule, ProfessoresRoutingModule, FormsModule],
	exports: [],
	providers: [ProfessoresService],
})

export class ProfessoresModule{}