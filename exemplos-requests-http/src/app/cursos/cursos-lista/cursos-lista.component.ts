import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, of, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
	styleUrls: ['./cursos-lista.component.scss'],
	preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

	//cursos: Curso[]
//p referenciar um template no html, usar @ViewChild
	@ViewChild('deleteModal') deleteModal;
	showDeleteModal: boolean = false

	cursoSelecionado : Curso
	cursos$: Observable<Curso[]>

	error$ = new Subject<boolean>()

	constructor(private service: Cursos2Service,
		private alertService: AlertModalService,
		private router: Router,
		private route: ActivatedRoute) { }

  ngOnInit(): void {
		this.atualizar()
  }
	atualizar(){
			//	this.service.list().subscribe(dados =>{
	//			this.cursos = dados
		//	})
	//com o uso abaixo, no html, usaremos o pipe async
	//'<tr *ngFor="let curso of cursos$ | async" >'
	this.cursos$ = this.service.list()
		.pipe(
			catchError(error => {
				console.error('passei aqui', error)
		//poderia retornar o of(), mas o ideal eh retornar empty()
		//pq no template temos 
		//'*ngIf="cursos$ | async as cursos; else loading"'
		//e se n retornar algo diferente de cursos, vai dar erro!
		//return of()
				this.error$.next(true)
				return empty() // ou a constante EMPTY
			})	
		)
	//caso vc n vá usar o pipe async e vah usar uma das formas mais
	//elegantes q temos na poc de unsubscribe desse projeto, usar
	//como abaixo:
	this.service.list().subscribe(
		dados => {
			console.log('dados', dados)
		},
		error =>{
			console.log('passei aqui tb')
			this.error$.next(true)
		},
		//qdo está completo
		() =>{
			console.log('Observable completo e nao vai mais emitir valor')
		}
	)
	//ou ainda pode ser usada a forma abaixo
	this.service.list()
		.pipe(
			catchError(error =>{
				console.log('e ainda passei aqui tb', error)
				this.error$.next(true)
				return empty()
			})
		)
		.subscribe(dados => {
			console.log('dados aqui ainda', dados)
		})
	}
//era p usar com bootstrap no curso, mas como n quis usar, 
	//estah sem uso no momento.	
	handleError(){
		//AlertModalComponent.type='erro'
		//AlertModalComponent.message='erro ao carregar cursos'
		this.alertService.showAlertDanger('ocorreu um erro')
	}

	onEdit(id){
		this.router.navigate(['editar', id], {relativeTo: this.route})
	}
	onDelete(curso){
		this.cursoSelecionado = curso
		this.showDeleteModal = true

		//const result$ = this.alertService.showConfirm('Confirmacao', 'Tem ctz q quer excluir?')
		//result$.asObservable()
		//.pipe(
		//take(1),
		//switchMap(result => result ? this.service.remove(curso.id) : EMPTY))
		//)
		/*
		.subscribe(
				success => {this.atualizar();					
					console.log('deletado com sucesso');
					this.showDeleteModal = false

				},
				error => {console.error('erro ao deletar', error);
				this.showDeleteModal = false
			}
			)
			*/

	}

	onConfirmDelete(){
		this.service.remove(this.cursoSelecionado.id)
			.subscribe(
				success => {this.atualizar();					
					console.log('deletado com sucesso');
					this.showDeleteModal = false

				},
				error => {console.error('erro ao deletar', error);
				this.showDeleteModal = false
			}
			)
	}
	onCancelDelete(){
		this.showDeleteModal = false
	}
}
