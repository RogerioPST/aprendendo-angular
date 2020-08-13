import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule
	],
	exports: [AlertModalComponent],
//informamos p o angular q o componente abaixo vai ser 
//instanciado	em tempo de execução, ou seja, n vai ser usado 
//dentro de um template ou em um roteamento por exemplo
	entryComponents: [AlertModalComponent, ConfirmModalComponent]
})
export class SharedModule { }
