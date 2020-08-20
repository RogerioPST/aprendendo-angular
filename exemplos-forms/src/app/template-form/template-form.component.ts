import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
	usuario: any ={
		nome: 'Rogerio',
		email: 'roger@email.com'
	}
	
	constructor(private http: HttpClient,
		private cepService: ConsultaCepService) { }
	
	consultaCEPAntigo(cep, formulario){
		cep = cep.replace(/\D/g, '')
		if (cep != ''){
			let validacep = /^[0-9]{8}$/
			if (validacep.test(cep)){
				this.resetaDadosForm(formulario)
				this.http.get(`//viacep.com.br/ws/${cep}/json`)
					.subscribe(response =>{
						console.log(response)
						this.populaDadosForm(response, formulario)
				})
			}
		}	
	}

	consultaCEP(cep, formulario){
		cep = cep.replace(/\D/g, '')
		if (cep != null && cep !== '') {
			this.resetaDadosForm(formulario)
			this.cepService.consultaCEP(cep)				
					.subscribe(response => {
						console.log(response)
						this.populaDadosForm(response, formulario)
					})					
		} 			
	}

	populaDadosForm(dados, formulario){
	/* 	formulario.setValue({
			nome: formulario.value.nome, 
			email: formulario.value.email, 
			endereco: {
				rua: dados.logradouro,
				cep: dados.cep,				
				numero: '',
				complemento: dados.complemento,
				bairro: dados.bairro,				
				cidade: dados.localidade,				
				estado: dados.uf,								
			}
		}) */
//o patchValue soh atualizar aquilo q eu quero alterar,
//ao contrario do setValue q precisa preencher todos os campos
		formulario.form.patchValue({
			endereco: {
				rua: dados.logradouro,
				cep: dados.cep,												
				bairro: dados.bairro,				
				complemento: dados.complemento,
				cidade: dados.localidade,				
				estado: dados.uf,								
			}
		})
	}

	//ou codigo abaixo ou formulario.form.reset()
	resetaDadosForm(formulario){		
		formulario.form.patchValue({
			endereco: {
				rua: null,
				cep: null,												
				bairro: null,				
				complemento: null,
				cidade: null,				
				estado: null,								
			}
		})

	}
	
  ngOnInit(): void {
	}
	onSubmit(f){
		console.log('form', f)
		this.http.post('https://httpbin.org/post', 
			JSON.stringify(f.value)).subscribe(response =>{
				console.log('post executado no end teste', response)
			})
	}
	verificaValidTouched(campo){
		return !campo.valid && campo.touched
	}
//colocar dentro de return o conteudo q viria dentro do objeto da diretiva ngClass: nomeClasse css : condição p receber essa classe
	aplicaCssErro(campo){
		return {
			'ng-invalid.ng-touched:not(form)': this.verificaValidTouched(campo)
		}
}


}
