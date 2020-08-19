import { Injectable } from '@angular/core'
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router'
import { AuthService } from '../login/auth.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
//p permitir acesso a uma rota ou n, implementar a interface 
//canActivateChild e tb colocar o canActivateChild no app.routing.module e
//qq routing q quisermos travar!
export class AlunosGuard implements CanActivateChild {

	constructor(private authService: AuthService,
		private router: Router) { }
	
//poderia injetar um serviço aqui, igual no AuthGuard
//chamar esse serviço e ele vai ate o servidor
//passamos o usuario logado e um codigo p identificar a rota e la no servidor vamos verificar se o usuario tem acesso ou n
//entao c esse retorno de observable de boolean, o angular ja sabe q vc fez uma chamada assincorna e q foi ao servidor e verificou.
//return Observable.of(false) - isso ja eh um chamada assincrona.
	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> |Promise<boolean> | boolean{
		console.log('[AlunosGuard] - guarda de rota filha')
		console.log('route do canActivateChild', route)
		console.log('state do canActivateChild', state)

		if (state.url.includes('edit')){
			//alert('usuario sem acesso')
			//return  Observable.of(false)
			//return false

		}
		return true

		
	}
}
