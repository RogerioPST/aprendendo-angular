import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

	queryField = new FormControl()

	readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'
	results$ : Observable<any>

	total: number = 0

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

	OnSearch(){
		const fields = 'name,description,version,homepage'
		let value = this.queryField.value
		if (value && (value = value.trim()) !== ''){	
		//usar assim ou paramsDinamico
			const params = {
				search: value,
				fields
			}				

			let paramsDinamico = new HttpParams()
			paramsDinamico = paramsDinamico.set('search', value)
			paramsDinamico = paramsDinamico.set('fields', fields)

			this.results$ = this.http
			.get(this.SEARCH_URL, {params: paramsDinamico})
				// a linha abaixo equivale a linha de cima
				//.get(this.SEARCH_URL + `?fields=${fields}&search=${value}`)
				.pipe(
					tap((res : any) =>this.total = res.total),
					map(res => res.results)
				)
		}

	}
}
