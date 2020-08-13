import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

	form: FormGroup
	submitted = false
	
	constructor(private formBuilder: FormBuilder, 
		private cursoService: CursosService,
		private location: Location,
		private route: ActivatedRoute) { }

	hasError(field: string){
		return this.form.get(field).errors
	}
  ngOnInit(): void {
		let registroTesteAssincrono = null;
//
		const curso = this.route.snapshot.data['curso_CursosRoutingModule']

// com o Resolve do guarda de rotas usado pela linha acima, n precisamos mais da linha abaixo
/* 		this.route.params.pipe(
			map(params => params['id']),
//para fazer a chamada p um método service q tb retorna observable, usar o switchMap			
			switchMap(id => this.cursoService.loadById(id))
		)
		.subscribe(curso => this.updateForm(curso))
 */
//ao invés de usar subscribes aninhados, refatorar como acima		
		/* this.route.params.subscribe(
			(params) =>{
				const id = params['id']
				console.log('id, ', id)
				const curso$ = this.cursoService.loadById(id)
				curso$.subscribe(curso =>{
					registroTesteAssincrono = curso
					this.updateForm(curso)
				})
			}
		) */
		//vai ficar nulo o valor
		console.log(registroTesteAssincrono)

		this.form = this.formBuilder.group({
			id: [curso.id],
			nome: [curso.nome, [Validators.required, Validators.minLength(3), 
				Validators.maxLength(10)]]
		})
//usado qdo n usava o resolver do curso
		/* this.form = this.formBuilder.group({
			id: [null],
			nome: [null, [Validators.required, Validators.minLength(3), 
				Validators.maxLength(10)]]
		}) */
	}
	/* updateForm(curso){
		this.form.patchValue({
			id: curso.id, 
			nome: curso.nome
		})
	} */
	
	onSubmit(){
		this.submitted = true
		console.log('formulario', this.form.value)
		if (this.form.valid){
			console.log('valido')
			this.cursoService.save(this.form.value)
			.subscribe(
				success => {
					console.log('requisição com sucesso')
					this.location.back()
				},					error => console.error('erro na req ', error),
				() => console.log(' msg qdo a request fica completada')
			)
			//usado qdo n se usava o metodo save acima
			/* if (this.form.value.id){
				//update
				this.cursoService.update(this.form.value)
					.subscribe(
						success => {
							console.log('curso atualizado com sucesso')
							this.location.back()
						},					error => console.error('erro no update ', error),
						() => console.log('[update] - msg qdo a request fica completada')
					)
			} else{
				//create
				this.cursoService.create(this.form.value)
					.subscribe(
						success => {
							console.log('curso criado com sucesso')
							this.location.back()
						},					error => console.error('erro', error),
						() => console.log('msg qdo a request fica completada')
					)
			} */
		}
	}
	onCancel(){
		this.submitted = false
		this.form.reset()
		console.log('formulario cancel', this.form.value)
	}

}
