import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[diretivaVersaoMaisCompletaHighlight]'
})
export class VersaoMaisCompletaHighlightDirective {

	@HostListener('mouseenter') mouseDentro(){		
		this.fundo = this.highlightColor
	}
	@HostListener('mouseleave') mouseFora(){		
		this.fundo = this.defaultColor
	}
	@HostBinding('style.backgroundColor') fundo: string

	//quero permitir o usuario definir essas cores na aplicação. 
	//para isso, uso o input p passar info customizada do html p 
	//diretiva.
	@Input() defaultColor : string = 'white'
	@Input() highlightColor : string = 'yellow'
	//Mesma coisa da linha acima, mas Com codigo ainda mais enxuto
	//@Input('diretivaVersaoMaisCompletaHighlight') highlightColor : string = 'yellow'

	constructor() { }
	
	ngOnInit(){
		this.fundo = this.defaultColor
	}

}
