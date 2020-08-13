import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {	
	aluno: any
	inscricao: Subscription
	formMudou : boolean = false

	constructor(private route: Router, private activatedRoute: ActivatedRoute, private alunosService: AlunosService) { }	
//metodo presente na interface IFormCanDeactivate.
	podeDesativar() {
		return this.podeMudarRota()
	}

	OnInput(){
		this.formMudou = true
	}

	podeMudarRota(){
		if (this.formMudou){
			return confirm('Tem certeza q deseja sair dessa pagina? Os dados do formulario serao perdidos..')
		}
		return true
	}

  ngOnInit(): void {
		/* const nav = this.route.getCurrentNavigation();
    this.aluno = nav.extras.state.aluno; */
	//	this.aluno = this.activatedRoute.
		 this.inscricao = this.activatedRoute.params.subscribe(params =>{
			this.aluno = this.alunosService.getAluno(params['id'])

			if (this.aluno == null){
				this.aluno = {}
			}
		})
 
	}
	ngOnDestroy(){
//		this.inscricao.unsubscribe()
	}

}
