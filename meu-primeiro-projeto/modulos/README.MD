# MODULOS
- [x] - Anotações

## Anotações:
<ol>
<li>	
	<ul>
		<li>
		dentro de declarations, colocamos os componentes, pipes e as diretivas, que se enxergam e que vamos usar nesse módulo:
		</li>
		<li>dentro de imports, colocamos outros módulos que queremos usar no módulo em questão ou componentes/pipes/diretivas dentro de declarations:
		</li>
		<li>dentro de providers, colocamos os serviços que ficarão disponíveis para componentes/pipes/diretivas dentro de declarations ou, no caso de AppModule, para toda aplicação. Exemplos no AppModule: serviços de autenticação, login, guarda de rotas:
		</li>
	</ul>

	
```javascript
@NgModule({
  declarations: [
		AppComponent
  ],
  imports: [
		BrowserModule,
		AppRoutingModule,
		CursosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
</li>
<li>no módulo de funcionalidade, no imports tem o CommonModule e no AppModule, o BrowserModule:

```javascript
@NgModule({
	declarations: [
		CursosComponent,
		CursoDetalheComponent
	],
  imports: [
    CommonModule
	],
	exports: [
		CursosComponent,		
	],
	providers: [
		CursosService
	]
})
export class CursosModule { }
```
</li>
<li>coloco no exports Componente/Diretiva/Pipe que quero q seja visivel para outros módulos e não coloco se quiser manter privado e coloco o CursosModule no imports do Módulo q quer usar esse item exportado.
</li>
<li>esse anotation @Injectable vai permitir a injecao de dependencia:

```javascript
@Injectable({
  providedIn: 'root'
})
export class CursosService {
	constructor() { }	
	getCursos(){
		return ['Java', 'Angular', 'CSS']
	}}
```
</li>
</ol>
