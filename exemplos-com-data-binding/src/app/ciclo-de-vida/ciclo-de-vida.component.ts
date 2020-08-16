import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit {

	@Input() valorCicloDeVida : number = 10

	constructor() { 
		this.log('constructor')
	}
//se tiver input property, usar NgOnChanges
//se n tiver input, ngOnInit
	ngOnChanges() { 
		this.log('ngOnChanges')
	}
	ngDoCheck() { 
		this.log('ngDoCheck')
	}
	ngOnDestroy() { 
		this.log('ngOnDestroy')
	}
	ngAfterContentInit() { 
		this.log('ngAfterContentInit')
	}
	ngAfterContentChecked() { 
		this.log('ngAfterContentChecked')
	}
	ngAfterViewInit() { 
		this.log('ngAfterViewInit')
	}
	ngAfterViewChecked() { 
		this.log('ngAfterViewChecked')
	}	

  ngOnInit(): void {
	}
	
	private log(hook: string){
		console.log(hook)
	}

}
