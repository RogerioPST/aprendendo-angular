import { Component, OnInit } from '@angular/core';


import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

	filtro: string

	livro: any ={
		titulo: 'Learn Javascript is so cool awesome',
		rating: 434.54321,
		numeroPaginas: 314,
		preco: 44.99, 
		dataLancamento: new Date(2016, 5,23),
		url: 'http://localhost:4200'
	}

	livros: string[] = ['Angular', 'Java', 'CSS']

	addCurso(valor: string){
		this.livros.push(valor)
	}

	obterLivrosFiltrados(){
		if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
			return this.livros
		}
		
		 let filter = this.filtro.toLowerCase()
    return this.livros.filter(livro => {
			if (livro.toLowerCase().indexOf(filter) >= 0 ){
				return true				
			}
			return false
		} )
	}

	//valorAsync 1 e 2 tem o mesmo resultado qdo se busca info do
	// servidor e quem decide eh a gente
	valorAsync = new Promise((resolve, reject) =>{
		setTimeout(()=>{
			resolve('valor assincrono')
		}, 20000)
	})

	valorAsync2 = interval(20000).pipe(map(valor => 'Valor assíncrono 2'));

  constructor() { }

  ngOnInit(): void {
  }

}
