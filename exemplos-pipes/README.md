# Exemplos de Pipes com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Informações sobre os Pipes ( | ):
<ul>
<li>são os filtros, ou seja, transformam um valor mostrado dentro do template</li>
<li>são aplicados na mesma ordem em que são colocados no código</li>
<li>implementam o metodo transform da interface PipeTransform</li>
<li>os parametros são colocados após os ':' (dois pontos): nomePipe:parametro1:parametro2</li>
</ul>
</li>

<li>
PIPES BUILT-IN:
<ul>
<li>ASYNC - pode ser usado tanto para Promise qto Observable: {{ valorAsync | async}}. Obs: o uso do pipe json não mostra o valor, mas sim o objeto Promise/Observable.

```javascript
//exemplos-pipes.component.ts
valorAsync = new Promise((resolve, reject) =>{
	setTimeout(()=>{ resolve('valor assincrono')}, 20000)})
valorAsync2 = interval(20000).pipe(map(valor => 'Valor assíncrono 2'));
//exemplos-pipes.component.html
<h5>obtendo o resultado assincrono de uma promise com o pipe async, por ex</h5>
<p>{{ valorAsync | json}}</p>
<p>{{ valorAsync | async}}</p>
<h5>obtendo o resultado assincrono do Observable do rxjs com o pipe async, por ex</h5>
<p>{{ valorAsync2 | json}}</p>
<p>{{ valorAsync2 | async}}</p>
```
</li>
<li>OUTROS PIPES
<ul>
<li>uppercase</li>
<li>lowercase</li>
<li>number:'1.1-2'</li>
<li>currency:'BRL':true</li>
<li>date:'dd-MM-yyyy'</li>
<li>json</li>
</ul>
</li>

</ul>
</li>
<li>
PIPES CUSTOMIZADOS:
<ul>
<li>implementar o metodo transform da interface  PipeTransform c o q vc quer fazer c o seu Pipe:

```javascript

//camel-case.pipe.ts
@Pipe({name: 'meupipeCamelCase'})
export class CamelCasePipe implements PipeTransform {
transform(value: any, ...args: unknown[]): unknown {
let values = value.split(' ')
let result = ''
for (let v of values){result += this.capitalize(v) + ' '}
return result;}
capitalize(value: string){
return value.substr(0,1).toUpperCase() + value.substr(1).toLowerCase()}}

//html
<p>Titulo: {{livro.titulo | uppercase | lowercase | meupipeCamelCase}}</p>
```
</li>

</ul>
</li>

<li>aplicando INTERNACIONALIZAÇÃO / LOCALE p <b>'pt-BR'</b> na app
<ul>
<li>usar o locale a seguir junto com o providers abaixo: registerLocaleData(br, 'pt-BR');
</li>
<li>1ª forma: providers: [ {
provide: LOCALE_ID,
useValue: 'pt-BR'
},]</li> 
<li>2ª forma: providers: [MeusSettingsService,
{
provide: LOCALE_ID,
deps: [MeusSettingsService],
useFactory: (settingsService) => settingsService.getLocale()
}]</li> 
</ul>

```javascript
//app.module.ts
registerLocaleData(br, 'pt-BR');
//usar o locale acima junto com o providers abaixo
@NgModule({
declarations: [AppComponent,ExemplosPipesComponent,CamelCasePipe,
FiltroArrayPipe,FiltroArrayImpuroPipe],
imports: [BrowserModule,AppRoutingModule,FormsModule],
providers: [ {
provide: LOCALE_ID,
useValue: 'pt-BR'
},  /* //2ª forma
 MeusSettingsService,
{
provide: LOCALE_ID,
deps: [MeusSettingsService],
useFactory: (settingsService) => settingsService.getLocale()
} */],
bootstrap: [AppComponent]})
export class AppModule { }

//MeusSettingsService
export class MeusSettingsService {
constructor() { }
getLocale(){return 'pt-BR'}}
```
</li>
<li>Exemplo de como deve ser usado em produção uma busca de itens com filtro por questão de performance ao invés de usar o parametro filtro em um pipe customizado:

```javascript
//.ts
filtro: string
livros: string[] = ['Angular', 'Java', 'CSS']
obterLivrosFiltrados(){
if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){ return this.livros}
let filter = this.filtro.toLowerCase()
return this.livros.filter(livro => {
if (livro.toLowerCase().indexOf(filter) >= 0 ){
return true				}
return false} )}

//html
<h5>Maneira correta q deve ser usada em producao - ao se usar filtros nos projetos</h5>
<ul><li *ngFor="let liv of obterLivrosFiltrados()">
{{liv  }}</li></ul>
```
</li>
</ol>
