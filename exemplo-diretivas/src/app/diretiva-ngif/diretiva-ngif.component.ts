import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.css']
})
export class DiretivaNgifComponent implements OnInit {

	cursos: string[] = []
	
	mostrarCursos: boolean = true

	constructor() { }
	
	toogleCursos(){
		this.mostrarCursos = !this.mostrarCursos
	}

  ngOnInit(): void {
  }

}
