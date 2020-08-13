import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';

import {tap, delay, take} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
	private readonly API =`${environment.API}/cursos`

	constructor(private http: HttpClient) { }
	
	list() : Observable<Curso[]>{
//aqui parametrizo qual o tipo de retorno do metodo list
//<Curso[]>
		return this.http.get<Curso[]>(this.API)
		.pipe(
			//carregando uma msg enquanto faz a chamada
			//<table *ngIf="cursos$ | async; else loading">
			delay(2000),
			tap(console.log),
		)
	}
//o operator take do rxjs faz com que o observable não fique escutando a todo momento, mas sim, apenas uma vez e não há necessidade de fazer o unsubscribe:
	loadById(id){
		return this.http.get<Curso>(`${this.API}/${id}`)
			.pipe(take(1))

	}
	private create(curso){
		const observableResponse = this.http.post(this.API, curso)		
			.pipe(take(1))
		return observableResponse
	}
	private update(curso){
		return this.http.put(`${this.API}/${curso.id}`, curso)
			.pipe(take(1))

	}
	save(curso){
		if (curso.id){
			return this.update(curso)
		} 
		return this.create(curso)	
	}
	remove(id){
		return this.http.delete(`${this.API}/${id}`)
		.pipe(take(1))
	}
}
