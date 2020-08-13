import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
	RouterStateSnapshot, Router, CanLoad, 
	Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

//vamos ter q injetar depois a nossa classe la na nossa rota
@Injectable({
  providedIn: 'root'
})
//p permitir acesso a uma rota ou n, implementar a interface 
//canActivate e tb colocar o canActivate no app.routing.module e
//qq routing q quisermos travar!
export class AuthGuard implements CanActivate, CanLoad {

	constructor(private authService: AuthService,
		private router: Router) { }

	canLoad(route: Route, 
		segments: UrlSegment[]
	): boolean | Observable<boolean> | Promise<boolean> {
//mesmo codigo do canActivate
//ou pode ser tb desenvolvida uma logica mais detalhada p 
//verificar se o usuario tem permissao de acessar um determinado
//modulo como foi visto em aulas anteriores. (aula < 69)
console.log('[CanLoad]: verificando se o usuario pode carregar o codigo')
		return this.verificarAcesso()
	}
	
private verificarAcesso(){
	if (this.authService.usuarioEstaAutenticado()){
		return true
	} 
	this.router.navigate(['/login'])
	return false

}	
//retorna V ou F ou Observable de boolean, se o usuario pode ou 
//n acessar uma determinada rota
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean{
		console.log('[AuthGuard]')
		return this.verificarAcesso()		
	}
}
