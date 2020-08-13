import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessoresService } from 'src/app/professores/professores.service';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit {
	professor: any
	inscricao: Subscription

	constructor(private route: Router, 
		private activatedRoute: ActivatedRoute, 
		private professoresService: ProfessoresService) { }	

  ngOnInit(): void {
		/* const nav = this.route.getCurrentNavigation();
    this.professor = nav.extras.state.professor; */
	//	this.professor = this.activatedRoute.
		 this.inscricao = this.activatedRoute.params.subscribe(params =>{
			this.professor = this.professoresService.getProfessor(params['id'])

			if (this.professor == null){
				this.professor = {}
			}
		})
 
		
	}
	ngOnDestroy(){
//		this.inscricao.unsubscribe()
	}

}