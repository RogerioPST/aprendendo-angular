import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[diretivaNgElse]'
})
export class NgElseDirective {
	//como essa diretiva pode ser usada em qq tag, coloco o <any>
//TemplateRef - faz referencia ao proprrio template ('<ng-template [diretivaNgElse]="!mostrarCursos">')
//ViewContainerRef - faz referencia ao conteudo dentro do TemplateRef
	constructor(private _templateRef: TemplateRef<any>,
		private _viewContainerRef: ViewContainerRef
	) { }

//alem de ser um @Input property, a diretiva recebe uma expressao 
//booleana ('[diretivaNgElse]="!mostrarCursos"')
//quero escutar td vez q for modificado/tiver nova atribuição. por isso, uso o set
	@Input() set diretivaNgElse(expressionCondition: boolean){
		if (!expressionCondition){
			//mostra o conteudo
			this._viewContainerRef.createEmbeddedView(this._templateRef)
		}else{
			//destroi o elemento
			this._viewContainerRef.clear()
		}
	}

	

}
