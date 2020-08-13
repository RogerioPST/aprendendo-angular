import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {

  nome = 'Componente sem unsubscribe. Esse tipo pode dar memory leak';
  nomeLog = 'Componente sem unsubscribe';
  valor: string;

  constructor(private service: EnviarValorService) { 
		this.service.getValor()
		.pipe(
			tap(v => console.log(this.nome, v))
		)
		.subscribe(novoValor => this.valor = novoValor)
	}

  ngOnInit() {

	}
	
	ngOnDestroy(){
		console.log(`${this.nomeLog} foi destruído!`)
	}

}