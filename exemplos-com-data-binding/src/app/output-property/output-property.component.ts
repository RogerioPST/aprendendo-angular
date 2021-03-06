import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-output-property',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
})
export class OutputPropertyComponent implements OnInit {
	@Input() valor: number  =0 

	//eh possivel de ou usar a forma abaixo ou "	outputs: ['mudouValor'] acima"
	@Output() mudouValor = new EventEmitter()

	@ViewChild('campoInput') campoValorInput: ElementRef
	@ViewChild('componenteCicloVida') componenteCicloVida: ElementRef

	incrementa(){
		//this.valor++		
		//a linha abaixo pode ser substituida pelo conteudo acima
		this.campoValorInput.nativeElement.value++
		this.mudouValor.emit(
			{
				novoValor: this.valor, 
				mostraLog: () =>{console.log('log vindo da funcao de output-property.ts')},
				componenteCicloVida: this.componenteCicloVida
			})
	}

	decrementa(){
		//this.valor--
		//a linha abaixo pode ser substituida pelo conteudo acima
		this.campoValorInput.nativeElement.value--
		this.mudouValor.emit(
			{
				novoValor: this.valor, 
				mostraLog: () =>{console.log('log vindo da funcao de output-property.ts')},
				componenteCicloVida: this.componenteCicloVida
			})
	}

  constructor() { }

  ngOnInit(): void {
  }

}
