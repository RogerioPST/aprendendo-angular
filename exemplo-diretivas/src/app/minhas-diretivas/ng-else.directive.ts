import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[diretivaNgElse]'
})
export class NgElseDirective {
//quero escutar td vez q for modificado. por isso, uso o set
	@Input() set diretivaNgElse(condition: boolean){
		if (!condition){
			this._viewContainerRef.createEmbeddedView(this._templateRef)
		}else{
			this._viewContainerRef.clear()
		}
	}

	//como essa diretiva pode ser usada em qq tag, coloco o <any>
	constructor(private _templateRef: TemplateRef<any>,
			private _viewContainerRef: ViewContainerRef
		) { }

}
