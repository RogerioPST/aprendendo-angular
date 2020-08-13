import { NgModule } from "@angular/core";
import { AlunosComponent } from './alunos.component';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunosService } from './alunos.service';
import { AlunosDeactivateGuard } from '../guards/alunos.deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

//AlunosDeactivateGuard - caso eu quisesse p toda app, colocaria no 
//app.module como provider
@NgModule({
	declarations:[
		AlunosComponent,
		AlunoFormComponent,
		AlunoDetalheComponent
	],
	imports: [CommonModule, AlunosRoutingModule, FormsModule],
	exports: [],
	providers: [AlunosService, AlunosDeactivateGuard, AlunoDetalheResolver],
})

export class AlunosModule{}