import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {
	inscricao: Subscription
	aluno: Aluno

	constructor(private route: Router, private activatedRoute: ActivatedRoute, private alunosService: AlunosService) { }	

	editarContato(){
		console.log('this id', this.aluno.id)
		this.route.navigate(['/alunos', this.aluno.id, 'editar'])
		/* this.route.navigateByUrl(`/alunos/${this.aluno.id}/edit`, {
      state: { aluno: this.aluno }
		})
		console.log('state', this.aluno) */
	}

  ngOnInit(): void {
	/* 	this.inscricao = this.activatedRoute.params.subscribe(params =>{
			this.aluno = this.alunosService.getAluno(params['id'])
		}) 
codigo acima sem usar Resolver e codigo abaixo usando Resolver		
		*/		
		this.inscricao = this.activatedRoute.data.subscribe((informacoes: {alunoResolver: Aluno}) =>{
			console.log('informacoes', informacoes)
// informacoes.aluno (aluno eh o nome q coloquei no 
//alunos.routing.module)
			this.aluno = informacoes.alunoResolver
		}

		)

	}
	ngOnDestroy(){
		this.inscricao.unsubscribe()
	}

}
