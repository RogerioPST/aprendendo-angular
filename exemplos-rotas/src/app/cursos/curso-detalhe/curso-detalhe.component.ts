import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {
	id: number
	inscricao: Subscription
	curso: any

	constructor(private route: ActivatedRoute, 
		private cursosService: CursosService,
		private router: Router) { 		
//		this.id = this.route.snapshot.params['id']		
//o codigo acima n funciona em todos os casos. usar subcribe abaixo
	}

  ngOnInit(): void {
		console.log('ngInit do CursoDetalheComponent')
		this.inscricao = this.route.params.subscribe(params =>{
			this.id = params['id']			
				this.curso = this.cursosService.getCurso(this.id)
				if (this.curso == null){											
						this.router.navigate(['/cursos/naoEncontrado', this.id])						
				}			
		})
	}
	
//como boa pratica , eh sempre bom no OnDestroy, cancelar 
//a subscrição
	ngOnDestroy(){
		this.inscricao.unsubscribe()
	}

}
