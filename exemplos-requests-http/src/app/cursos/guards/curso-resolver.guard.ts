import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {
	constructor(
		private cursosService: CursosService
	){}

	resolve(route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot
	): Observable<Curso> {
//nesse caso, será um update
		if (route.params && route.params['id']){
			return this.cursosService.loadById(route.params['id'])
		}
//nesse caso, será um create
//o of retorna um observable a partir de um objeto
		return of({
			id: null,
			nome: null
		})	  
	}
}