import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	usuario: Usuario = new Usuario()

	constructor(private authService: AuthService) { }
	
	
  ngOnInit(): void {
		this.usuario.nome = 'u@e'
		this.usuario.senha = '123'
	}

	fazerLogin(usuario: Usuario){
		console.log('usuario', usuario.nome)
		console.log('usuario', usuario.senha)
		
		this.authService.fazerLogin(usuario)

	}

}
