import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeusSettingsService {

	constructor() { }
	
	getLocale(){
		return 'pt-BR'
	}
}
