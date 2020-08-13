import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br />',
})
export abstract class BaseFormComponent implements OnInit {
	formulario: FormGroup

  constructor() { }

  ngOnInit(): void {
	}
	resetar() {
		this.formulario.reset()
	}
	verificaValidTouched(campo: string) {
		//return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched
		return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
	}
	verificaEmailInvalido() {
		let campoEmail = this.formulario.get('email')
		if (campoEmail.errors) {
			return campoEmail.errors['email'] && campoEmail.touched
		}
	}
	aplicaCssErro(campo: string) {
		return {
			'ng-invalid.ng-touched:not(form)': this.verificaValidTouched(campo)
		}
	}
	verificaRequired (campo: string){
		return (
			this.formulario.get(campo).hasError('required') &&
			(this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
		)
	}
	abstract submit()
	verificaValidacoesForm(formGroup: FormGroup | FormArray) {
		Object.keys(formGroup.controls).forEach(campo => {
			console.log('campo', campo)
			const controle = formGroup.get(campo)
			controle.markAsDirty()
			controle.markAsTouched()
			if (controle instanceof FormGroup || controle instanceof FormArray) {
				this.verificaValidacoesForm(controle)
			}
		})
	}

	onSubmit(){
		if (this.formulario.valid){
			this.submit()
		}else {
			console.log('formulario invalido')
			this.verificaValidacoesForm(this.formulario)
		}

	}
	getCampo(campo: string){
		return this.formulario.get(campo)
	}
}
