import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc-unsub',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubComponent implements OnInit, OnDestroy {

  nome = 'Componente com unsubscribe manual (que nao deve ser usado). Ao invés desse, usar o rxjs "take until" ';
  nomeLog = 'Componente com unsubscribe'
	valor: string;
	
	sub: Subscription[] = []

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
//caso tivesse apenas uma Subscription, faria
//this.sub = this.service.getValor().....		
		this.sub.push( 
			this.service.getValor()
			.pipe(
				tap(v => console.log(this.nome, v))
			)
			.subscribe(novoValor => this.valor = novoValor)
		)
	}

	ngOnDestroy(){
		this.sub.forEach(subscricao => subscricao.unsubscribe())
		console.log(`${this.nomeLog} foi destruído!`)
	}

}