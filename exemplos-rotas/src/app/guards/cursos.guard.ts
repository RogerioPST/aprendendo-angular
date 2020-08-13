import { Injectable } from '@angular/core'
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router'
import { AuthService } from '../login/auth.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
//p permitir acesso a uma rota ou n, implementar a interface 
//canActivate e tb colocar o canActivate no app.routing.module e
//qq routing q quisermos travar!
export class CursosGuard implements CanActivateChild {

	constructor(private authService: AuthService,
		private router: Router) { }
	
	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> |Promise<boolean> | boolean{
		console.log('[CursosGuard] - guarda de rota filha')
		console.log('route do canActivateChild', route)
		console.log('state do canActivateChild', state)

		/* if (state.url.includes('editar')){
			alert('usuario sem acesso')
			return false
		} */
		return true

		
	}
}
