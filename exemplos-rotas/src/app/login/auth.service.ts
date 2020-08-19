import { Injectable, Output, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private usuarioAutenticado: boolean = false
	mostrarMenuEmitter = new EventEmitter<boolean>()	
	//mostrarMenuEmitter2 = new EventEmitter<boolean>();

	constructor(private router: Router) { }

	usuarioEstaAutenticado(){
		return this.usuarioAutenticado
	}
	
	fazerLogin(usuario: Usuario){
		if (usuario.nome == 'u@e' && usuario.senha == '123'){
			console.log('cheguei no true')
			this.usuarioAutenticado = true
			this.mostrarMenuEmitter.emit(true)
			this.router.navigate(['/'])
		} else{
			console.log('cheguei else')
			this.usuarioAutenticado = false
			this.mostrarMenuEmitter.emit(false)
		}

	}
}
