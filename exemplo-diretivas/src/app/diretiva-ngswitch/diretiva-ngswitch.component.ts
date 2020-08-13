import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngswitch',
  templateUrl: './diretiva-ngswitch.component.html',
  styleUrls: ['./diretiva-ngswitch.component.css']
})
export class DiretivaNgswitchComponent implements OnInit {

	aba: string = 'home'
	abaFuncao: string = 'home'
	
	mudaValorDaAbaFuncao(novoValor: string){
		this.abaFuncao = novoValor
	}

	constructor() { }
	

	ngOnChanges() { 
		this.log('ngOnChanges: ', this.aba)
	}
	ngDoCheck() { 
		this.log('ngDoCheck: ', this.aba)	
	}
	ngOnDestroy() { 
		this.log('ngOnDestroy: ', this.aba)
	}
	ngAfterContentInit() { 
		this.log('ngAfterContentInit: ', this.aba)
	}
	ngAfterContentChecked() { 
		this.log('ngAfterContentChecked: ', this.aba)
	}
	ngAfterViewInit() { 
		this.log('ngAfterViewInit: ', this.aba)
	}
	ngAfterViewChecked() { 
		this.log('ngAfterViewChecked: ', this.aba)		
	}	

  ngOnInit(): void {
	}
	
	private log(hook: string, aba: string){
		console.log(hook, aba)
	}

}
