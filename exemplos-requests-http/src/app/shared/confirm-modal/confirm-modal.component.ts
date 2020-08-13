import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
	showModal : boolean = true
	@Input() title: string
	@Input() msg: string
	@Input() cancelTxt  : string = 'Cancelar'
	@Input() okTxt  : string = 'Confirmar'

// Subject emite valores e vamos conseguir escutar esses valores, a partir de um Observable
	confirmResult : Subject<boolean>
	
  constructor() { }

  ngOnInit(): void {
		this.confirmResult = new Subject()
	}
	
	onClose(){
		this.confirmResult.next(false)
		this.showModal = false
	}
	onConfirm(){
		this.confirmResult.next(true)
		this.showModal = false
	}
}
