import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {
	private professores: any[] = [
		{id: 1, nome: 'professor 1', email: 'rogerio.pst@gmail.com'},		
		{id: 2, nome: 'professor 2', email: 'rogerio.pst3@gmail.com'},		
		{id: 3, nome: 'professor 3', email: 'rogerio.pst4@gmail.com'},		
	]

	getProfessores(){
		return this.professores
	}

	getProfessor(id: number){
		for (let i =0; i<this.professores.length;i++){
			let professor = this.professores[i]
			if (professor.id == id){
				return professor
			}
		}
		return null
	}

}
