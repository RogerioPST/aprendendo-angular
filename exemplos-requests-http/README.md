# ExemplosRequestsHttp com Angular
- [x] - Anotações
- [ ] - complementar

## Anotações:
<ol>
<li>
comandos via cli do angular:
<ul>
<li>ng g m upload-file --routing - cria o modulo de upload com arquivo routing</li>
<li>ng g c upload-file - cria o componente de upload</li>
</ul>
</li>
<li>
	o operator take do rxjs faz com que o observable não fique escutando a todo momento, mas sim, apenas uma vez e não há necessidade de fazer o unsubscribe:

	```javascript
	create(curso: Curso){		
		const observableResponse = this.http.post(this.API, curso)	
			.pipe(take(1))
		return observableResponse
	}
	```
</li>
<li>
o 'private location: Location' importado de '@angular/common', tem o método 'back()', q faz a msm coisa como se clicassemos no voltar no navegador:

```javascript
this.location.back()
```
</li>
<li>o código abaixo não usa subscribes aninhados. Para fazer a chamada p um método service q tb retorna observable, usar o switchMap, q tb cancela as chamadas anteriores ('editar/1'), caso tenha sido feita uma chamada p editar/1 e depois editar/2:

```javascript
this.route.params.pipe(
	map(params => params['id']),
	switchMap(id => this.cursoService.loadById(id))
	//switchMap(curso => obterAulas(curso))
)
.subscribe(curso => this.updateForm(curso))
```
</li>
<li>Caso seja necessário create, update ou delete, pode-se usar:
<ul>
	<li>concatMap - ordem da requisição importa, ou seja, se crio o registro 1, depois o registro 2 e depois 3, quero receber o resultado primeiro do 1, depois 2 e depois 3.</li>
	<li>mergeMap - ordem da requisição não importa.</li>
	<li>exhaustMap - vai realizar a requisição e obter uma resposta antes da segunda tentativa. Por ex, faço pedido p o primeiro registro e aguardo a resposta. Depois q recebo a resposta, faço o pedido p o registro 2. <strong>Comum em caso de login</strong></li>
</ul>
</li>
<li>
o <strong>this.route.params</strong> (importado de ActivatedRoute) é gerenciado pelo angular e já faz o unsubscribe qdo mudamos a rota.
</li>
<li>o guarda de rotas <strong>curso-resolver.guard.ts</strong> (ou CursoResolverGuard) foi criado por questão de desempenho p hora de criar ou editar um curso.

```javascript
const routes: Routes = [
	{path: '', component: CursosListaComponent},
	{path: 'novo', component: CursosFormComponent,
	resolve:{
	//ao invés de curso, poderia ser qualquer nome
		curso: CursoResolverGuard
	}
	},
	{path: 'editar/:id', component: CursosFormComponent,
	resolve:{
		curso: CursoResolverGuard
	}
	}
];
```
</li>
<li>
o <strong>of</strong> retorna um Observable a partir de um objeto:

```javascript
return of({
			id: null,
			nome: null
		})	  
```
</li>
<li>
o atributo data é onde fica um objeto como o de 
'resolve: {curso: CursoResolverGuard}'

```javascript
this.route.snapshot.data['curso'] 
```
</li>
<li>
p referenciar um template no html, usar 
<strong>@ViewChild</strong>

```javascript
@ViewChild('deleteModal') deleteModal;
```
</li>
<li>
se eu quiser criar um <strong>CRUD Genérico</strong>, criar como abaixo:

```javascript
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

//vai usar o CrudService Generico
export class Cursos2Service extends CrudService<Curso>{

  constructor(protected http: HttpClient) {
		super(http, `${environment.API}/cursos`);
	 }
}
```
</li>
<li>
p criar um request manualmente no angular, no caso,<strong>upload de arquivos</strong>

```javascript
upload(files : Set<File>, url : string){
	const formData = new FormData()
	files.forEach(file => formData.append('file', file, file.name))
	const request = new HttpRequest('POST', url, formData )
	return this.http.request(request)
	//ou usando o tracional this.http.post(url, formData)
}
```
</li>
<li>
usar <strong>PROXY-CONFIG</strong> p q possa ser desabilitado o cors no backend, por ex.
PASSOS:
<ol>
<li>criar o arquivo proxy.config.js ou json:

```javascript
const PROXY_CONFIG = [
	{
		context: ['/api'],
		target: 'http://localhost:8000/',
		secure: false,
		logLevel: 'debug',
		pathRewrite: {'^/api': ''}
	}
]

module.exports = PROXY_CONFIG

//JSON
{
	"/api/*":{
		"target": "http://localhost:8000",
		"secure": false,
		"logLevel": "debug",
		"pathRewrite":{
			"^/api": ""
		}
	}
}
```
</li>
<li>alterar o script no package.json para

```javascript
"start": "ng serve --proxy-config proxy.config.js",
//ou
"start": "ng serve --proxy-config proxy.config.json",
```
</li>
<li>alterar a url de chamada do upload para:

```javascript
onUpload(){
	if (this.files && this.files.size > 0){
		this.uploadService.upload(this.files, '/api/upload')
			.subscribe(response => console.log('upload feito'))
	}	
}
```
</li>
</ol>
</li>
<li>para fazer uma <strong>barra de progresso de upload de arquivos</strong>. Passos:
<ol>
<li>adicionar o atributo observe e reportProgress do objeto no arquivo: upload-service.ts:

```javascript
upload(files : Set<File>, url : string){
	const formData = new FormData()
	files.forEach(file => formData.append('file', file, file.name))
	return this.http.post(url, formData,{
		observe: "events",
		reportProgress: true
	})}
```
</li>
<li>adicionar o conteudo que vem do tipo UploadProgress no upload.component.ts:

```javascript
onUpload(){
if (this.files && this.files.size > 0){
	this.uploadService.upload(this.files, environment.BASE_URL + '/upload')
		.subscribe((event: HttpEvent<Object>) => {				
			console.log(event)
			if (event.type === HttpEventType.Response){
				console.log('upload feito')
			}else if (event.type === HttpEventType.UploadProgress){
				const percentDone = Math.round(((event.loaded * 100)/ event.total))
				console.log('percentDone', percentDone)
				this.progress = percentDone
			}
		})
}
```
</li>
<li>adicionar as div no html do componente:

```javascript
<div>
	<div style="background-color: black;"
		[style.width]="progress + '%'"
	>_</div>
	<p>{{progress}}%</p>
</div>
```
</li>
</ol>


</li>
li>para fazer um <strong>operador customizado do rxjs</strong>. Passos:
<ol>
<li>criar o arquivo rxjs-customizes-operators.ts:

```javascript
import { pipe } from 'rxjs';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';

export function filterResponse<T>(){
	return pipe(
		filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
		map((res: HttpResponse<T>) => res.body))
}

export function uploadProgress<T>(callback: (progress : number) => void){
	return tap((event: HttpEvent<T>) =>{
		if (event.type === HttpEventType.UploadProgress){
			callback(Math.round((event.loaded *100) / event.total))
		}
	})
}
```
</li>
<li>alterar o arquivo upload.component.ts:

```javascript
onUpload(){
	if (this.files && this.files.size > 0){
		this.uploadService.upload(this.files, environment.BASE_URL + '/upload')
//usando o operator customizado criado
	.pipe(
		uploadProgress(progress => {
			console.log('uploadprogress', progress)
			this.progress = progress
		}),
		filterResponse()
	)
	.subscribe(resp => console.log('upload feito'))
	}}
```
</li>

</ol>
