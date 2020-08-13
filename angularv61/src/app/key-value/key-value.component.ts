import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-value',
  templateUrl: './key-value.component.html',
  styles: []
})
export class KeyValueComponent implements OnInit {

  cursos = [
    { id: '1', nome: 'Angular'},
    { id: '2', nome: 'Java'},
  ];

	//caso n esteja gostando da forma como o angular esta ordenando, 
	//utilizar o nosso proprio comparator como abaixo, no caso, 
	//ordem lexografica inversa
  cursosComparator(a: any, b: any) {
    if (a.key === b.key) {
      return 0;
    }
    return a.key > b.key ? -1 : 1;
  }

  constructor() { }

  ngOnInit() {
  }

}
