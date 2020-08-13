import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarValorService {

//pode ser usada essa logica p dizer se o usuario está logado	
//como criamos um observable no angular
	private emissor$ = new Subject<string>()

	emitirValor(valor: string){
		this.emissor$.next(valor)
	}

	getValor(){
		return this.emissor$.asObservable()
	}

  constructor() { }
}
