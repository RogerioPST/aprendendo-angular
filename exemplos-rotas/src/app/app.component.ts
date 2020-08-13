import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'exemplos-rotas';
	
	mostrarMenu: boolean = true

	constructor(private authService: AuthService){}

	ngOnInit(){
	/* 	this.authService.mostrarMenuEmitter.subscribe(mostrar => {
			console.log('mostrar', mostrar)
			this.mostrarMenu = mostrar
		}
		) */
	 	/* this.authService.mostrarMenuEmitter.on('true', (mostrar)=>{
			console.log('mostrar', mostrar)
			this.mostrarMenu = mostrar
		})  */
	}
}
