import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form.validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

	//@Input() msgErro: string
	//@Input() mostrarErro: boolean
//	Curso Angular #112: Formulários reativos: Serviço de Mensagens de Erros
//p n repetir o codigo mostrarErro em todos componentes em 
//data-form.component.html, usar o codigo abaixo
	@Input() control: FormControl
	@Input() label: string


  constructor() { }

  ngOnInit(): void {
	}
	
	//itera e verifica e mostra apenas uma validação por vez
	get errorMessage(){
		for (const propertyName in this.control.errors){
			console.log('error-msg.component.ts', propertyName)
			if (this.control.errors.hasOwnProperty(propertyName) &&
			this.control.touched){
				return FormValidations.getErrorMsg(this.label, propertyName, 
					this.control.errors[propertyName])
			}

		}
		return null
	}

}
