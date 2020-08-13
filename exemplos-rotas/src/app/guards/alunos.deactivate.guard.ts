import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';
import {UrlTree} from '@angular/router'
import {Observable} from 'rxjs'
import { Injectable } from '@angular/core';
import { IFormCanDeactivate } from './iform-candeactivate';

@Injectable()
//caso queira criar uma interface generica p ser usada por outros 
//componentes, criar a interface IFormCanDeactivate.
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate>{
	canDeactivate(
		component: IFormCanDeactivate, 
		currentRoute: ActivatedRouteSnapshot, 
		currentState: RouterStateSnapshot, 
		nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
			console.log('guarda de desativacao - testar, por ex, indo em editar dos alunos e estando no editar, tentar clicar em Cursos, vai disparar esse console.log:' )
// formMudou soh existe em AlunoFormComponent e n no IFormCanDeactivate.
			//if (component.formMudou){
			//	return confirm('tem certeza q deseja sair dessa pagina? Os dados do formulario serao perdidos..')
		//	}
		return component.podeDesativar()
			//return true
		//throw new Error("Method not implemented.");
	}


}