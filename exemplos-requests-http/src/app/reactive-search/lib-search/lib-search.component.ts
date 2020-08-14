import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

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
	readonly FIELDS = 'name,description,version,homepage'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
		this.results$ = this.queryField.valueChanges
			.pipe(
				map(v => v.trim()), //mapeia e remove espaços
				filter(v => v.length > 1), //filtra qtd de caracteres > 1
				debounceTime(200), //retarda a chamada em 200 ms
				distinctUntilChanged(), //soh busca, se valor <> do anterior
				//tap(value => console.log(value)),
				switchMap(value => this.http.get(this.SEARCH_URL, {
					params: {
						search: value, 
						fields: this.FIELDS
					}
				})), 
				tap((res: any) => this.total = res.total),
				map((res: any) => res.results)
			)
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
