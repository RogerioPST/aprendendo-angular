import { Component, OnInit } from '@angular/core';
import { ProfessoresService } from './professores.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
	public professores: any[] = []

  constructor(private professoresService: ProfessoresService) { }

  ngOnInit(): void {
		this.professores = this.professoresService.getProfessores()
  }

}
