import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CrudService<T>{
	constructor(protected http: HttpClient,
		private API_URL) { }

	list(){		
		return this.http.get<T[]>(this.API_URL)
		.pipe(			
			delay(2000),
			tap(console.log),
		)
	}
		//o operator take do rxjs faz com que o observable não fique escutando a todo momento, mas sim, apenas uma vez e não há necessidade de fazer o unsubscribe:
			loadById(id){
				return this.http.get<T>(`${this.API_URL}/${id}`)
					.pipe(take(1))
		
			}
			private create(record : T){
				const observableResponse = this.http.post(this.API_URL, record)		
					.pipe(take(1))
				return observableResponse
			}
			private update(record : T){
				return this.http.put(`${this.API_URL}/${record['id']}`, record)
					.pipe(take(1))
		
			}
			save(record : T){
				if (record['id']){
					return this.update(record)
				} 
				return this.create(record)	
			}
			remove(id){
				return this.http.delete(`${this.API_URL}/${id}`)
				.pipe(take(1))
			}
}