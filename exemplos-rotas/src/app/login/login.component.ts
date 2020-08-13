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
	}

	fazerLogin(nome: string, senha: string){
		console.log('usuario', nome)
		console.log('usuario', senha)
		this.usuario.nome = nome
		this.usuario.senha = senha
		this.authService.fazerLogin(this.usuario)

	}

}
