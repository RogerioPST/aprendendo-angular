import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {

  nome = 'Componente com takeUntil (qdo se quer q o observable fiquei vivo durante ciclo de vida do componente (exemplo: stream de dados do netflix)';
  nomeLog = 'Componente com takeUntil'
	valor: string;
	
	unsub$ = new Subject()

  constructor(private service: EnviarValorService) {}
//essa eh a opcao mais elegante, caso vc precise q o seu
//observable fique vivo durante todo o ciclo de vida do 
//componente
  ngOnInit() {
		this.service.getValor()
		.pipe(
			tap(v => console.log(this.nome, v)),
			takeUntil(this.unsub$)
		)
		.subscribe(novoValor => this.valor = novoValor)

	}
//essa eh uma das formas de não se ter problemas de memory leak	
	ngOnDestroy(){
		this.unsub$.next()
		this.unsub$.complete()
		console.log(`${this.nomeLog} foi destruído!`)
	}
}