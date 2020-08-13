import { Injectable } from '@angular/core';

export enum AlertTypes{
	DANGER = 'erro',
	SUCCESS = 'sucesso',

}

@Injectable({
	providedIn: 'root'
})
export class AlertModalService {
	//era p usar com bootstrap no curso, mas como n quis usar, 
	//estah sem uso no momento.	
	constructor() { }
	private showAlert(message: string, type: string, dismissTimeout?: number){
		//AlertModalComponent.type=type
		//AlertModalComponent.message=message
		if (dismissTimeout){
			setTimeout(() =>{
				//esconde o modal
			}, dismissTimeout)
		}
	}

	showAlertDanger(message: string){		
		//AlertModalComponent.type='erro'
		//AlertModalComponent.message=message
		this.showAlert('erro', AlertTypes.DANGER)
	}
	showAlertSuccess(message: string){
		//AlertModalComponent.type='sucesso'
		//AlertModalComponent.message=message
		this.showAlert('sucesso', AlertTypes.SUCCESS)
	}

	showConfirm(title: string, msg: string, 
		okTxt?: string, cancelTxt? : string
		){
			//const bsModalRef : BsModalRef = this.modalService
			//.show(ConfirmModalComponent)
			//bsModalRef.content.title = title 
			//bsModalRef.content.msg = msg 
			if (okTxt){
			 //bsModalRef.content.okTxt = okTxt 
			}
			if (cancelTxt){
				//bsModalRef.content.cancelTxt = cancelTxt 
			}
			//return (<ConfirmModalComponent>bsModalRef.content).confirmResult
		}
	
}
