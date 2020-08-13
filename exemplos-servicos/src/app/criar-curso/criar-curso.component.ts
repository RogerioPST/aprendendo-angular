import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos/cursos.service';

//se eu quiser q apenas esse componente tenha acesso ao 
//Cursosservice, declaro aqui como provider, mas daih n terei 
//mais singleton, se esse Cursosservice for colocado em outro 
//component
@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
	styleUrls: ['./criar-curso.component.css'],
	providers: [CursosService]
})
export class CriarCursoComponent implements OnInit {
	cursos: string[] =[]

  constructor(private _cursosService: CursosService) { }

  ngOnInit(): void {
		this.cursos = this._cursosService.getCursos()
	}
	
	onAddCurso(curso: string){
		this._cursosService.addCurso(curso)
	}

}
