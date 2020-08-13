import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessoresService } from 'src/app/professores/professores.service';

@Component({
  selector: 'app-professor-detalhe',
  templateUrl: './professor-detalhe.component.html',
  styleUrls: ['./professor-detalhe.component.css']
})
export class ProfessorDetalheComponent implements OnInit {
	inscricao: Subscription
	professor: any

	constructor(private route: Router, private activatedRoute: ActivatedRoute, 
		private professoresService: ProfessoresService) { }	

	editarContato(){
		console.log('this id', this.professor.id)
		this.route.navigate(['/professores', this.professor.id, 'editar'])
		/* this.route.navigateByUrl(`/professors/${this.professor.id}/edit`, {
      state: { professor: this.professor }
		})
		console.log('state', this.professor) */
	}

  ngOnInit(): void {
		this.inscricao = this.activatedRoute.params.subscribe(params =>{
			this.professor = this.professoresService.getProfessor(params['id'])
		})

	}
	ngOnDestroy(){
		this.inscricao.unsubscribe()
	}

}
