import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../shared/form.validations';
import { VerificaEmailService } from '../data-form/services/verifica-email.service';
import { map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

@Component({
	selector: 'app-data-form-a-partir-base-form',
	templateUrl: './data-form-a-partir-base-form.component.html',
	styleUrls: ['./data-form-a-partir-base-form.component.css']
})
export class DataFormAPartirBaseFormComponent extends BaseFormComponent implements OnInit {
	cidades: Cidade[]
	estados: EstadoBr[]	
	//estados: Observable<EstadoBr[]>
	cargos: any[]
	tecnologias: any[]
	newsletterOp: any[]
	frameworks = ['Angular', 'React', 'Vue', 'Sencha']

	constructor(private formBuilder: FormBuilder,
		private http: HttpClient,
		private dropDownService: DropdownService,
		private cepService: ConsultaCepService,
		private verificarEmailService: VerificaEmailService) { 
			super()
		}

		setCargo(){
			const cargo = {nome:'Dev', nivel: 'Pleno', desc: 'Dev Pl'}
			this.formulario.get('cargo').setValue(cargo)
		}
		setTecnologias(){
			this.formulario.get('tecnologias').setValue(['Java', 'PHP', 'CSS'])
		}

		compararCargos(obj1, obj2){
			return obj1 && obj2 ? 
				(obj1.nome === obj2.nome && obj1.nivel ===obj2.nivel):
				obj1 === obj2
		}
		ngOnInit(): void {
			console.log('[ngOnInit]')
//usado apenas p saber q estava funcionando o verificarEmailService			
		//	this.verificarEmailService.verificarEmail('email@email.com')
		//		.subscribe()

			this.cargos = this.dropDownService.getCargos()
			//this.estados = this.dropDownService.getEstadosBr()
			this.dropDownService.getEstadosBr()
				.subscribe(dados => this.estados = dados)
			this.tecnologias = this.dropDownService.getTecnologias()
			this.newsletterOp = this.dropDownService.getNewsletter()
			//o codigo abaixo pode resultar em memoryLeak e n esta sendo
			//usado p popular os estados
			this.dropDownService.getEstadosBr()				
				.subscribe(response =>{
					//console.log('tipo de estados', typeof response)
					//this.estados = response
				})
	
			//hah duas formas de iniciar um formulario
			//1. Formgroup
			/* this.formulario = new FormGroup({
				nome: new FormControl('Roger'),
				email: new FormControl(null),
				endereco: new FormGroup({
					cep: new FormControl(null),
				})
			}) */
			//2. FormBuilder - faz por baixo dos panos o codigo acima.
			this.formulario = this.formBuilder.group({
				nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
//terceiro parametro eh p validacoes assincronas				
				email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
				confirmarEmail: [null, [FormValidations.equalsTo('email')]],
				cargo: [null],
				graduacao: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
				frameworks: this.buildFrameworks(),
				newsletter: ['s'],
				termos: [false, Validators.pattern('true')],
				tecnologias: [null],
				endereco: this.formBuilder.group({
					cep: [null, [Validators.required, FormValidations.cepValidator]],
					numero: [null, [Validators.required]],
					complemento: [null],
					rua: [null, [Validators.required]],
					bairro: [null, [Validators.required]],
					cidade: [null, [Validators.required]],
					estado: [null, [Validators.required, Validators.maxLength(2)]],
				})
			})

/*exemplificando o pq de se chamar formularios reativos.
this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
*/
	this.formulario.get('endereco.cep').valueChanges
		.subscribe(value => {
			console.log('valor do CEP', value)
		})			
	this.formulario.get('endereco.cep').statusChanges
		.pipe(
			distinctUntilChanged(),
			tap(value => console.log('status CEP: ', value))
			
		)
		.subscribe(status => {
			if (status === 'VALID'){
				this.cepService
					.consultaCEP(this.formulario.get('endereco.cep').value)
						.subscribe(dados => this.populaDadosForm(dados))
			}			
		})			
			//this.formulario.get('nome').setValue('Roger')
			//this.formulario.get('email').setValue('r@r.com')

		this.dropDownService.getCidades(8).subscribe(response =>{
			console.log('cidades', response)
		})
//estamos escutando as alterações dos dados de um formulario
		this.formulario.get('endereco.estado').valueChanges
			.pipe(
				tap(estado => console.log('novo estado: ', estado)),
				map(estado => this.estados.filter(e => e.sigla === estado)),
				map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
				switchMap((estadoId : number) => this.dropDownService.getCidades(estadoId)),
				tap(console.log)


			)
			.subscribe(cidades =>{
				this.cidades = cidades
			})

		
	}	
	buildFrameworks(){

	 	const values = this.frameworks.map(v =>{
			return new FormControl(false);
		})

		console.log('valores', values)
		return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1)) 
		 
		/* return this.formBuilder.array( [
			new FormControl(false),
			new FormControl(false),
			new FormControl(false),
			new FormControl(false),
		])  */
	}
	submit() {
		console.log('formulario', this.formulario)
//codigo abaixo ref aos frameworks serve p recuperar o valor 
//ao inves de true ou false dos frameworks e filter p retirar
//o null
		let valueSubmit = Object.assign({}, this.formulario.value)

		valueSubmit = Object.assign(valueSubmit, {
			frameworks: valueSubmit.frameworks
				.map((v, i) => v ? this.frameworks[i] : null)
				.filter(v => v !== null)
		})

		console.log('valuesubmit', valueSubmit)

		this.http.post('https://httpbin.org/post',
		JSON.stringify(valueSubmit))
		.subscribe(response => {
			console.log('post executado', response)
			this.resetar()
		},
			(error: any) => alert('erro')
		)
	}		
	
	//ou codigo abaixo ou formulario.form.reset()
	resetaDadosForm() {
		this.formulario.patchValue({
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
	consultaCEP() {
		 	let cep = this.formulario.get('endereco.cep').value
			cep = cep.replace(/\D/g, '')
			if (cep != null && cep !== '') {
				this.resetaDadosForm()
				this.cepService.consultaCEP(cep)				
						.subscribe(response => {
							console.log(response)
							this.populaDadosForm(response)
						})					
			} 
	}
	consultaCEPAntigo() {
	/* 	let cep = this.formulario.get('endereco.cep').value
		cep = cep.replace(/\D/g, '')
		if (cep != '') {
			let validacep = /^[0-9]{8}$/
			if (validacep.test(cep)) {
				this.resetaDadosForm()
				this.http.get(`//viacep.com.br/ws/${cep}/json`)
					.subscribe(response => {
						console.log(response)
						this.populaDadosForm(response)
					})
			}
		} */
	}

	populaDadosForm(dados) {
		this.formulario.patchValue({
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
	
	validarEmail(formControl: FormControl){
		return this.verificarEmailService.verificarEmail(formControl.value)
			.pipe(map(emailExiste => emailExiste ? {emailInvalido: true} : null))
	}
}
