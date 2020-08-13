import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import{ Observable} from 'rxjs'
import {  Injectable } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno>{
	
	constructor(private alunosService: AlunosService){}

	resolve(route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot
	): Aluno | Observable<Aluno> | Promise<Aluno> {
		let id = route.paramMap.get('id')
		return this.alunosService.getAluno(parseInt(id))
	}

}