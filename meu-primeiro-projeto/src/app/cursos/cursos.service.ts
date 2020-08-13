import { Injectable } from '@angular/core';


//esse anotation injectable vai permitir a injecao de dependencia
@Injectable({
  providedIn: 'root'
})
export class CursosService {

	//http

	constructor() { }
	
	getCursos(){
		return ['Java', 'Angular', 'CSS']
	}
}
