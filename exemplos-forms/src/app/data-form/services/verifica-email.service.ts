import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, tap, delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

	constructor(private htp: HttpClient) { }
	
	verificarEmail(email: string){
		return this.htp.get('assets/dados/verificarEmail.json')
			.pipe(
//delay de segundos p n bombardear o servidor e causar deny of service				
				delay(2000),
//map, pois vou descartar qualquer outra coisa q tenha vindo no json q n tenho interesse				
				map((dados: {emails: any[]}) => dados.emails),
				tap(console.log),
				map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
				tap(console.log),
				map((dados: any[]) => dados.length > 0),
				tap(console.log),
			)
	}
}
