import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[diretivaHighlightMouse]'
})
export class HighlightMouseDirective {
//a classe HostListener permite escutar um evento de passar o 
//mouse, por exemplo,
@HostListener('mouseenter') quandoMouseEstaOver(){
	//this._renderer2.setStyle(this._elementeRef.nativeElement, 'background-color', 'yellow')
	this.fundoDoElemento = 'yellow'
}
@HostListener('mouseleave') quandoMouseEstaFora(){
	//this._renderer2.setStyle(this._elementeRef.nativeElement, 'background-color', 'white')
	this.fundoDoElemento = 'white'
}

//com o HostBinding, n preciso da injecao de dependencia e nem 
//da classe Renderer2. permite fazer a associacao de uma classe, 
//atributo css do html para uma variavel
@HostBinding('style.backgroundColor') fundoDoElemento: string;

/* constructor(private _elementeRef: ElementRef, private _renderer2: Renderer2) { 
} */
}
