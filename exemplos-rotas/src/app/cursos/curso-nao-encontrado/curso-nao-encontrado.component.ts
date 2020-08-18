import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curso-nao-encontrado',
  templateUrl: './curso-nao-encontrado.component.html',
  styleUrls: ['./curso-nao-encontrado.component.css']
})
export class CursoNaoEncontradoComponent implements OnInit {
	inscricao : Subscription
	id: number
	mensagem: string
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
		this.inscricao = this.activateRoute.params.subscribe(params =>{
			this.id = params['id']
			this.mensagem = `O curso com id ${this.id} não foi encontrado`
		})
	}
	
	ngOnDestroy(){
		this.inscricao.unsubscribe()
	}

}
