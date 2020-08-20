# Exemplos com Tipos de Data Binding com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b>](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)


## Anotações:

### INTERPOLAÇÃO:
<ol>
<li>pode usar p contas, operações lógicas:

```javascript
//arquivo html
<p>String renderizada com interpolação (que também é uma forma de property binding): {{ url }}</p>
<p>Resultado de 1 + 1 : {{ 1+1 }}</p>
<p>Resultado de 1 + 1 não é: {{ 1+1+ getValor() }}</p>
<p>Curso de angular: {{ cursoAngular && getCurtirCurso()}}</p>
<img src="{{urlImagem}}" alt="">

//arquivo .ts
url: string = 'www.google.com'
cursoAngular: boolean = true
getCurtirCurso() : boolean{ return true }
getValor() : number{ return 1 }
urlImagem : string = 'https://images.unsplash.com/photo-1588615419957-bf66d53c6b49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60'
```
</li>
</ol>

### PROPERTY BINDING
<ol>
<li>é o valor do componente para o template. há as duas formas de property binding:

```javascript
//qdo for string, n coloca colchetes
<img src="http://urlimg.com" />	
<img [src]="urlImagem">
<!-- a linha de cima é um açucar sintatico da linha de baixo-->
<img bind-src="urlImagem">
```
</li>
<li>quando não existe uma propriedade no elemento, usa-se <b>[attr.colspan]</b></li>
</ol>

### CLASS BINDING
<ol>
<li>tambem é uma forma de property binding, no caso, PROPERTY BINDING DE CLASSE.
</li>
<li>classe eh variavel local de template e para mudar o seu valor, necessita do event binding do (change):

```javascript

//css
.alert-success{	background-color: green;}
.alert-info{	background-color: blue;}
.alert-warn{	background-color: yellow;}
.alert-danger{	background-color: red;} 
//html
<select #classe (change)="0">
	<option value="alert-success">Sucesso</option>
	<option value="alert-info">infoo</option>
	<option value="alert-warn">warning</option>
	<option value="alert-danger">danger</option>
</select>
```
</li>
<li>acrescentando o class binding. só mostra a class, se a operação lógica  {{ classe.value == 'alert-success' }} resultar em true:

```javascript
<div [class.alert-success]="classe.value == 'alert-success'">sucesso</div>
<div [class.alert-info]="classe.value == 'alert-info'">info</div>
<div [class.alert-warn]="classe.value == 'alert-warn'">warning</div>
<div [class.alert-danger]="classe.value == 'alert-danger'">danger</div>		
<!-- como a interpolação é uma forma de property binding, outra forma de acrescentar a classe é via interpolação-->
<div class="{{classe.value}}">texto colorido conforme valor do combo-box</div>
``` 
</li>
</ol>

### STYLE BINDING
<ol>
<li>property binding com estilo de classe:

```javascript
<div class="alert-danger" [style.display]="classe.value == 'alert-danger' ? 'block' : 'none'">essa div somente aparece em caso de erro/escolhido danger</div>
```
</li>
</ol>

### EVENT BINDING
<ol>
<li>todo event binding , por ex, click($event), tem um $event disponivel p ser usado:

```javascript
//css
.highlight{
	cursor: pointer;
	font-weight: bold;
	background-color: blueviolet;}
//js
valorQueFoiDigitado: string ='valor inicial'
valorSalvo : string 
isMouseOver: boolean = false
metodoClicar(){alert("clicou")}
metodoDigitar(evento: KeyboardEvent){
this.valorQueFoiDigitado = (<HTMLInputElement>evento.target).value}
salvarValor(valor: string){this.valorSalvo = valor}
onMouseOverOut(){this.isMouseOver = !this.isMouseOver}
//html
<button (click)="metodoClicar()">Clique</button>
<!--por baixo dos panos o angular transforma o de baixo no de cima-->
<button on-click="metodoClicar()">Clique</button>
<input type="text" (keyup)="metodoDigitar($event)"
(keyup.enter)="salvarValor($event.target.value)"
(blur)="salvarValor(campoInput.value)" #campoInput>
<p>valor atual: {{valorQueFoiDigitado}}</p>
<p>valor salvo: {{valorSalvo}}</p>
<span (mouseover)="onMouseOverOut()" (mouseout)="onMouseOverOut()" [class.highlight]="isMouseOver" >Passe o mouse sobre mim</span></div>
```
</li>
</ol>
### TWO WAY DATA BINDING
<ol>
<li>ngModel é a representacao de uma entidade, q pode ser
campo simples string ou um objeto:

```javascript
//html
<p>1ª forma juntando property binding e event binding
<input type="text" [value]="nome"(input)="nome = $event.target.value"/></p>
<p>2ª forma juntando property binding e event binding
<input type="text" [ngModel]="nome"(ngModelChange)="nome = $event"/></p>
<p>a 1ª forma do two way data binding:
<input type="text" [(ngModel)]="nome"/></p>
<p>a 2ª form two way data binding - por baixo dos panos:
<input type="text" bindon-ngModel="nome"/></p>
<p>Você digitou: {{nome}}</p>
<p>Informações do objeto pessoa</p>
<p><input type="text" [(ngModel)]="pessoa.nome">
<input type="text" [(ngModel)]="pessoa.idade"></p>
<p>Meu nome é {{pessoa.nome}} e tenho {{pessoa.idade}} idade</p>
//arquivo .ts
nome: string = 'Rogerio';
pessoa : any ={ nome: "Roger",	idade:36 }
```
</li>
<li>
lembrar de importar o FormsModule qdo for diferente de AppModule (import {FormsModule} from '@angular/forms')
</li>
</ol>

### @INPUT() PROPERTY
<ol>
<li>
<ul>
<li>pode ser passado como input property string ou objeto do componente pai p o filho:</li>
<li>com o @Input() abaixo, conseguimos expor a propriedade nome  p q seja passado um valor de outro componente p cá</li>
<li>no caso, 'nomeCurso' passa o valor para 'nome'</li>
<li>eh possivel de ou usar a forma @Input ou o código comentado dentro de @Component: "inputs: ['nome:nomeCurso'] abaixo"</li>
</ul>

```javascript
//arquivo input-property.component.html
<p>nome do input: {{nome}}</p>
//arquivo input-property.component.ts
@Component({  
	styleUrls: ['./input-property.component.css'],
	//inputs: ['nome:nomeCurso']
})
export class InputPropertyComponent implements OnInit {
@Input('nomeCurso') nome: string = ''
//data-binding-component.html
<input type="text" [(ngModel)]="nomeDoCurso">
<app-input-property [nomeCurso]="nomeDoCurso"></app-input-property>
//data-binding-component.ts
nomeDoCurso: string = "Angular";
```
</li>
</ol>

### @OUTPUT() PROPERTY
<ol>
<li>
<ul>
<li>usado para emitir eventos do componente filho para o pai</li>
<li>com o @Output() abaixo, conseguimos emitir um evento customizado para que o componente pai escute o resultado dessa função</li>
<li>qdo o componente pai receber o evento 'mudouValor', chamará a função 'onMudouValor' p receber as informações passadas</li>
<li>eh possivel de ou usar a forma @Output ou o código comentado dentro de @Component: "outputs: ['mudouValor'] abaixo"</li>
</ul>

```javascript
//arquivo output-property.component.html
<button (click)="decrementa()">-</button>
<input type="text" readonly [value]="valor" #campoInput>
<button (click)="incrementa()">+</button>

//arquivo output-property.component.ts
@Component({  
	styleUrls: ['./output-property.component.css']
	//outputs: ['mudouValor']	
})
export class OutputPropertyComponent implements OnInit {
@Input() valor: number  =0; 
@Output() mudouValor = new EventEmitter();
@ViewChild('campoInput') campoValorInput: ElementRef;
incrementa(){
this.valor++;		
this.mudouValor.emit({novoValor: this.valor});}
decrementa(){
this.valor--;
this.mudouValor.emit({novoValor: this.valor, mostraLog: () =>{console.log('log vindo da funcao de output-property.ts')}})
//data-binding-component.html
<app-output-property valor="10" (mudouValor)="onMudouValor($event)"></app-output-property>
//data-binding-component.ts
onMudouValor(evento){
console.log('chamado qdo recebe o event binding customizado do output-property.ts', evento)
console.log('valor escutado de output-property.ts', evento.novoValor)
console.log('função recebida e executada em output-property.ts', evento.mostraLog())}
```
</li>
</ol>

### Acesso ao DOM e ao Template com @VIEWCHILD()
<ol>
<li>
<ul>
<li>usado para referenciar um componente do Angular inteiro:

```javascript
//html
<app-ciclo-de-vida #componenteCicloVida></app-ciclo-de-vida>
//arquivo .ts
@ViewChild('componenteCicloVida') componenteCicloVida: ElementRef

this.mudouValor.emit(
{
	novoValor: this.valor, 
	mostraLog: () =>{console.log('log vindo da funcao de output-property.ts')},
	componenteCicloVida: this.componenteCicloVida
})
//arquivo .ts q recebe o evento
onMudouValor(evento){
	console.log('chamado qdo recebe o event binding customizado do output-property.ts', evento)
	console.log('valor escutado de output-property.ts', evento.novoValor)
	console.log('função recebida e executada em output-property.ts', evento.mostraLog())
	console.log('componente app-ciclo-vida vindo de output-property.ts via @ViewChild', evento.componenteCicloVida)
}
```
</li>
<li>usado para referenciar um campoInput ou elemento HTML</li>
</ul>

```javascript
//arquivo output-property.component.html
<button (click)="decrementa()">-</button>
<input type="text" readonly [value]="valor" #campoInput>
<button (click)="incrementa()">+</button>
//arquivo output-property.component.ts
@ViewChild('campoInput') campoValorInput: ElementRef;
incrementa(){
//this.valor++;		
//a linha abaixo pode ser substituida pelo conteudo acima
this.campoValorInput.nativeElement.value++;
decrementa(){
//this.valor--;
//a linha abaixo pode ser substituida pelo conteudo acima
this.campoValorInput.nativeElement.value--;
```
</li>
</ol>


### CICLO DE VIDA DO COMPONENTE / LIFE CYCLE HOOKS
<ol>
<li>
<ul>
<li>1º - ngOnChanges: qdo o valor property-binding é atualizado - usar se tiver @Input property</li>
<li>2º - ngOnInit: qdo o Componente é inicializado apenas - usar se n tiver @Input property</li>
<li>3º - ngDoCheck: a cada ciclo de verificação de mudanças</li>
<li>4º - ngAfterContentInit: depois de inserir conteúdo externo na view/no template</li>
<li>5º - ngAfterContentChecked: primeiro verifica e depois faz a verificação de conteúdo inserido</li>
<li>6º - ngAfterViewChecked: a cada verificação de conteúdo / conteúdo filho </li>
<li>7º - ngOnDestroy: antes da diretiva/componente ser destruído </li>
</ul>
</li>
</ol>
