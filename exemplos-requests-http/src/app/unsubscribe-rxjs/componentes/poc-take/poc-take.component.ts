import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../../enviar-valor.service';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {

	nome = `Componente com take (qtas vezes quero receber essa 
		resposta. Usar com chamadas HTTP/AJAX em q só se faz aquela 
		chamada e, se retorna sucesso ou erro, pronto, acabou!!!`;
	nomeLog = 'Componente com take'	
  valor: string;

  constructor(private service: EnviarValorService) {
		this.service.getValor()
		.pipe(
			tap(v => console.log(this.nome, v)),
			take(1)
		)
		.subscribe(novoValor => this.valor = novoValor)
	}

  ngOnInit() {

	}
	ngOnDestroy(){	
		console.log(`${this.nomeLog} foi destruído!`)
	}
}