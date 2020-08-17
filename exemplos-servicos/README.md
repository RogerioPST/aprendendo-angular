# Exemplos de Serviços com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Informações sobre os Serviços:
<ul>
<li>pode ser feito um settingsService p fornecer info da app, usuarios p a app inteira</li>
<li>são Singletons e são colocados apenas em um dos providers do módulo p ficarem disponiveis p aquele modulo ou no app.module p app toda ou apenas no Componente p ficar disponivel apenas para aquele componente: 'providers: [CursosService,LogService]'</li>
<li>se quiser q tenha mais de uma instancia do CursosService, colocar como provider em mais de um Componente.</li>
</ul>
</li>
<li>qdo n puder passar informações via property @Input() - de pai p filho e @Output() - filho p pai, pode usar os Serviços (broadcast de eventos) p essa comunicação.
<ol>
<li>cada componente vai ter como provider o CursosService e no CursosService terá 'static emitirCursoCriado = new EventEmitter' que irá emitir o evento de curso criado a cada nova adição: '
CursosService.criouNovoCurso.emit(curso)'
</li>
<li>o componente q quiser escutar esse evento, terá: 'CursosService.criouNovoCurso
			.subscribe(cursoCriado =>this.curso = cursoCriado)'
</li>
<li>caso não seja static, preciso adicionar o componente ReceberCursoCriado ao modulo CriarCurso e adiconar o seletor do receberCursoCriado no html do criarCurso, fazendo c q o ReceberCursoCriado seja componente filho do CriarCurso e permaneça uma só instancia de CursosService compartilhada: this._cursosService.emitirCursoCriado.subscribe(cursoCriado =>this.curso = cursoCriado.
</li>

</ol>

```javascript
//cursos.service.ts
export class CursosService{
emitirCursoCriado = new EventEmitter<string>();
static criouNovoCurso = new EventEmitter<string>();
cursos: string [] = ['Angular', 'Java', 'CSS']
getCursos(){
this._logService.consoleLog('obtendo lista de cursos')
return this.cursos}
constructor(private _logService: LogService){
console.log('chamando construtor do CursosService')}
addCurso(curso: string){this.cursos.push(curso)
//msm tendo duas instancias de CursosService, c o codigo abaixo, faço a segunda instancia receber as info de cursos criados
this.emitirCursoCriado.emit(curso)
CursosService.criouNovoCurso.emit(curso)
}

//cursos.modules.ts
@NgModule({
declarations: [    CursosComponent],
imports: [CommonModule,    ],
exports: [CursosComponent]})
export class CursosModule { }

//criar-curso-module.ts
@NgModule({
declarations:[CriarCursoComponent, ReceberCursoCriadoComponent],
imports: [   CommonModule,      ],
exports: [CriarCursoComponent]})
export class CriarCursoModule { }

//app.module.ts
@NgModule({
declarations: [AppComponent,],
imports: [BrowserModule,AppRoutingModule,CriarCursoModule,
CursosModule],
providers: [LogService],
bootstrap: [AppComponent]})
export class AppModule { }

//curso.component.ts
export class CursosComponent implements OnInit {
cursos: string[] = []
constructor(private cursosService: CursosService) { }
ngOnInit(): void {this.cursos = this.cursosService.getCursos();
CursosService.criouNovoCurso
.subscribe(curso => this.cursos.push(curso))}}

//criar-curso.component.ts
cursos: string[] =[]
constructor(private _cursosService: CursosService) { }
ngOnInit(): void {this.cursos = this._cursosService.getCursos()}
onAddCurso(curso: string){this._cursosService.addCurso(curso)}

//receber-curso-criado.component.ts
export class ReceberCursoCriadoComponent implements OnInit {
curso: string
constructor(private _cursosService: CursosService) { }
ngOnInit(): void {this._cursosService.emitirCursoCriado.subscribe(cursoCriado =>this.curso = cursoCriado)}}

//criar-curso.component.html
<input type="text" #cursoInput>
<button (click)="onAddCurso(cursoInput.value)">Adicionar</button>
<app-receber-curso-criado></app-receber-curso-criado>
```
</li>
</ol>