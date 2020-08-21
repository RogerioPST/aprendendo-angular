import { FormArray, FormControl, FormGroup } from '@angular/forms'

export class FormValidations {
	//funcao p obrigar a preencher o minimo de itens no checkbox
//função dentro de outra funcao por causa do parametro extra min =1
	static requiredMinCheckbox(min = 1){
		const validator = (formArray: FormArray) =>{
		/* 
		logica p programacao estruturada
		const values = formArray.controls
			let totalChecked = 0

			for (let i=0; i< values.length; i++){
				if (values[i].value.checked){
					totalChecked++
				}
			} */
			const totalChecked = formArray.controls
				.map(v => v.value)
				.reduce((total, current) => current ? total + current : total, 0)

//p esse caso, o angular precisa q retorne um objeto.
			return totalChecked >= min ? null : {required: true}
		}

		return validator
	}
//dessa forma, n precisa passar o control como parametro no arquivo
//data-form.component.ts
//cep: [null, [Validators.required, FormValidations.cepValidator]],
	static cepValidator(control: FormControl){
		const cep = control.value
		if (cep && cep !== ''){
			console.log('cep aqui', cep)
			const validacep = /^[0-9]{5}(-)*[0-9]{3}$/;
			return validacep.test(cep) ? null : {cepInvalido: true}
		}

	}

	static equalsTo(otherField: string){
//formControl eh o proprio campo onde vai estar a validacao
		const validator = (formControl: FormControl) =>{
			if (otherField == null){
				throw new Error('é necessario informar um campo')
			}
//com o root, acessamos a raiz do formulario
			if (!formControl.root || !(<FormGroup>formControl.root).controls){
//quer dizer q o formulario ainda n esta pronto/totalmente carregado
//q o angular vai exec essa validacao desde qdo renderizar na tela
				return null
			}
			const field = (<FormGroup> formControl.root).get(otherField)
			if (!field){
				throw new Error('é necessario informar um campo válido')
			}

			if (field.value !== formControl.value){
//pode retornar um objeto com qualquer mensagem				
				return { equalsTo: otherField}
			}
			return null
		}
		return validator
	}

	static getErrorMsg(fieldName: string, validatorName: string,
		validatorValue?: any){
		const config ={
			'required': `${fieldName} é obrigatório!`,
			'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
			'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
			'cepInvalido': 'CEP inválido',
			'emailInvalido': 'Email inválido',
			'equalsTo': 'Não são iguais',
		}
		return config[validatorName]
	}
}