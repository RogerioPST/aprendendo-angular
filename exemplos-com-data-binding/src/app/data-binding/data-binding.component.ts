import { Component, OnInit, EventEmitter } from '@angular/core';

interface ValorDTO{
	novoValor: string
}

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

	url: string = 'www.google.com'
	cursoAngular: boolean = true
	
	valorQueFoiDigitado: string ='valor inicial'
	valorSalvo : string 
	isMouseOver: boolean = false
	
	nome: string = 'Rogerio'
	pessoa : any ={
		nome: "Roger",
		idade:36
	}

	nomeDoCurso: string = "Angular"

	urlImagem : string = 'https://images.unsplash.com/photo-1588615419957-bf66d53c6b49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60'

	getCurtirCurso() : boolean{
		return true
	}

	getValor() : number{
		return 1
	}

	metodoClicar(){
		alert("clicou")
	}

	metodoDigitar(evento: KeyboardEvent){
		
		this.valorQueFoiDigitado = (<HTMLInputElement>evento.target).value

	}
	salvarValor(valor: string){
		this.valorSalvo = valor
	}

	onMouseOverOut(){
		this.isMouseOver = !this.isMouseOver
	}

	onMudouValor(evento){
		console.log('chamado qdo recebe o event binding customizado do output-property.ts', evento)
		console.log('valor escutado de output-property.ts', evento.novoValor)
		console.log('função recebida e executada em output-property.ts', evento.mostraLog())
		console.log('componente app-ciclo-vida vindo de output-property.ts via @ViewChild', evento.componenteCicloVida)
	}

  constructor() { }

  ngOnInit(): void {
	}
	

}
