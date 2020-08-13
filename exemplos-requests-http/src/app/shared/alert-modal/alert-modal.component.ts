import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

	//era p usar com bootstrap no curso, mas como n quis usar, 
	//estah sem uso no momento.
	@Input() type = 'sucesso'
	@Input() message: string

	
  constructor() { }

  ngOnInit(): void {
	}
	
	fechar(){
		console.log('fechou')
	}

}
