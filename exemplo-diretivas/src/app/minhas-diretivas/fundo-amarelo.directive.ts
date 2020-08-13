import { Directive, ElementRef, Renderer2 } from '@angular/core';

//se eu quiser q a diretiva seja aplicada apenas a um tipo de tag
//html ou componente, coloco esse elemento na frente do selector
//mesmo q eu tente aplicar ao button como no exemplo, n vai!!
@Directive({
  selector: 'p[diretivaFundoAmarelo]'
})
export class FundoAmareloDirective {


	constructor(private _elementRef: ElementRef,
		private _renderer: Renderer2) { 
//ElementRef eh a classe p referenciar qq elemento do DOM
		console.log(_elementRef)
//o codigo abaixo permite ataques de cross scripting e o angular 
//pede p usar Renderer no lugar
		//this._elementRef.nativeElement.style.backgroundColor = 'yellow'
		this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow')
	}

}
