import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-input-property',
  templateUrl: './input-property.component.html',
	styleUrls: ['./input-property.component.css'],
		//inputs: ['nome:nomeCurso']
})
export class InputPropertyComponent implements OnInit {

//com o Input abaixo, conseguimos expor a propriedade nome com o nome
//'nomeCurso' p q seja passado um valor de outro componente p cá
//eh possivel de ou usar a forma abaixo ou "	inputs: ['nome:nomeCurso'] acima"
	@Input('nomeCurso') 
	nome: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
