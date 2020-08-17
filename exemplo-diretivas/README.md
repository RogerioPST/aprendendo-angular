# ExemploDiretivas com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Informações sobre o que são diretivas:
<ul>
<li>é uma forma de passar instruções p os templates</li>
<li>os componentes são diretivas c template. A instrução, no caso, é:"crie um componente do tipo especificado e renderiza o template desse componente nesse lugar"  
</li>
<li><b>diretiva estrutural</b>, que interage com o template e modifica a estrutura do DOM e/ou código HTML. Exemplos: ngFor, ngIf 
</li>
<li><b>diretiva de atributos</b>, que interage com o elemento em que for aplicada, mas não modifica a estrutura do DOM e/ou código HTML. Exemplos: ng-class, ng-style
</li>
</ul>
</li>
<li>DIRETIVA CUSTOMIZADAS: 
<ul>
<li>DIRETIVA de atributo fundoAmarelo - elemento que a possuir terá o fundo amarelo, exceto se for diferente da tag 'p':
<ul>
<li>se eu quiser q a diretiva seja aplicada apenas a um tipo de tag html ou componente, coloco esse elemento na frente do selector. Exemplos: p[diretivaFundoAmarelo], button[diretivaFundoAmarelo], app-diretiva-ngif[diretivaFundoAmarelo]. No caso, como foi aplicado a tag 'p', mesmo q eu tente aplicar ao button como no exemplo, n vai!!</li>
<li>ElementRef é a classe p referenciar qq elemento do DOM </li>
<li>o codigo abaixo funciona, mas permite ataques de cross scripting e o angular pede p usar Renderer no lugar
//this._elementRef.nativeElement.style.backgroundColor = 'yellow'
</li>

</ul>

```javascript

// fundo-amarelo.directive.ts
@Directive({
selector: 'p[diretivaFundoAmarelo]'
})
export class FundoAmareloDirective {
constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { 
console.log(_elementRef);
this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow')}}

//html
<p diretivaFundoAmarelo>diretivas-customizadas works!</p>
```
</li>

<li>DIRETIVA de atributo highlight-mouse - elemento que a possuir terá uma mudança de background-color qdo passar o mouse por cima dele:
<ul>
<li>a classe HostListener permite escutar um evento de passar o 
mouse, por exemplo</li>
<li>p n duplicar codigo, com o HostBinding, n preciso da injecao de dependencia e nem 
da classe Renderer2 e ele permite fazer a associacao de um determinado atributo da diretiva p um determinado atributo do html, css, classe do HTML. Por ex, o 'style.backgroundColor'</li>
</ul>

```javascript

// highlight-mouse.directive.ts
@Directive({
	selector: '[diretivaHighlightMouse]'})
export class HighlightMouseDirective {
@HostListener('mouseenter') quandoMouseEstaOver(){
//this._renderer2.setStyle(this._elementeRef.nativeElement, 'background-color', 'yellow')
this.fundoDoElemento = 'yellow'}
@HostListener('mouseleave') quandoMouseEstaFora(){
//this._renderer2.setStyle(this._elementeRef.nativeElement, 'background-color', 'white')
this.fundoDoElemento = 'white'}
@HostBinding('style.backgroundColor') fundoDoElemento: string;
//constructor(private _elementeRef: ElementRef, private _renderer2: Renderer2) { }}

//html
<p diretivaHighlightMouse>Texto com highlight quando passo o mouse</p>
```
</li>

<li>DIRETIVA de atributo versao-mais-completa-highlight-mouse - elemento que a possuir terá uma mudança de background-color qdo passar o mouse por cima dele e vai permitir o usuário escolher as cores por @Input() property:
<ul>
<li>[diretivaVersaoMaisCompletaHighlight]="'red'" - usando o mesmo nome da diretiva e @Input('diretivaVersaoMaisCompletaHighlight'), o Angular sabe q se trata de diretiva e de @Input() property ao mesmo tempo.</li>
</ul>

```javascript

// versao-mais-completa-highlight.directive.ts
@Directive({
selector: '[diretivaVersaoMaisCompletaHighlight]'})
export class VersaoMaisCompletaHighlightDirective {
@HostListener('mouseenter') mouseDentro(){		
this.fundo = this.highlightColor}
@HostListener('mouseleave') mouseFora(){		
this.fundo = this.defaultColor}
@HostBinding('style.backgroundColor') fundo: string
@Input() defaultColor : string = 'white'
@Input() newColor : string = 'blue'
@Input('diretivaVersaoMaisCompletaHighlight') highlightColor : string = 'yellow'
ngOnInit(){ this.fundo = this.newColor }

//html
<p diretivaVersaoMaisCompletaHighlight
[defaultColor]="'grey'"	[newColor]="'red'">
Texto com a versão do highlight mais completa quando passo o mouse</p>
<h5>Mesma coisa da linha acima, mas Com codigo ainda mais enxuto usando o input property com o mesmo nome da diretiva, o Angular eh inteligente p saber que é uma diretiva e ao mesmo tempo é uma input property</h5>
<p [diretivaVersaoMaisCompletaHighlight]="'red'"
[defaultColor]="'grey'"	>Texto com a versão do highlight mais completa quando passo o mouse</p> 
```
</li>

<li>DIRETIVA de estrutura ngElse - else:
<ul>
<li>como essa diretiva pode ser usada em qq tag, coloco o <any> em ('TemplateRef<any>')</li>
<li>TemplateRef - faz referencia ao proprio template ('ng-template [diretivaNgElse]="!mostrarCursos"')</li>
<li>ViewContainerRef - faz referencia ao conteudo dentro do TemplateRef</li>
<li>alem de ser um @Input property, a diretiva recebe uma expressao booleana ('[diretivaNgElse]="!mostrarCursos"')
</li>
<li>uso o set, pois quero escutar td vez q for modificado/tiver nova atribuição: ('@Input() set diretivaNgElse(expressionCondition: boolean)')</li>
<li>o metodo createEmbeddedView() de _viewContainerRef mostra o conteudo: ('this._viewContainerRef.createEmbeddedView(this._templateRef)')</li>
<li>o metodo clear() de _viewContainerRef destroi o elemento</li>
</ul>

```javascript
//diretivas-customizadas.component.ts
mostrarCursos: boolean = false;
onMostrarCursos(){ this.mostrarCursos = ! this.mostrarCursos }

// ng-else.directive.ts
@Directive({ selector: '[diretivaNgElse]'})
export class NgElseDirective {
constructor(private _templateRef: TemplateRef<any>,
private _viewContainerRef: ViewContainerRef) { }
@Input() set diretivaNgElse(expressionCondition: boolean){
if (!expressionCondition){
//mostra o conteudo
this._viewContainerRef.createEmbeddedView(this._templateRef)
}else{
//destroi o elemento
this._viewContainerRef.clear()
}
}

//html
<div *diretivaNgElse="mostrarCursos">não existem cursos</div>
<h5>Usando a diretiva ng-else criada por mim, mas com ng-template</h5>
<ng-template [diretivaNgElse]="mostrarCursos">não existem cursos
</ng-template>
<ng-template [diretivaNgElse]="!mostrarCursos" >lista de cursos aqui </ng-template>
<button (click)="onMostrarCursos()" >Mostrar ou esconder cursos
</button>
```
</li>

</ul>

<li>DIRETIVAS BUILT-IN:
<ul>
<li>DIRETIVA ngIf: 
<ul>
<li>[hidden] - como alternativa - é menos custoso usar o hidden caso o custo de criar a árvore de elementos seja grande. obs: hidden não deve ser usado qdo usuário não pode ver algum item.
</li>
<li>
A origem da tag 'template' é a especificação padrão Web Components que está sendo implementada nos browsers. http://webcomponents.org/articles/introduction-to-template-element
</li>
</ul>

```javascript
// .ts
cursos: string[] = [];
mostrarCursos: boolean = true;
toogleCursos(){ this.mostrarCursos = !this.mostrarCursos}

//html
<div *ngIf="cursos.length > 0">	Lista de cursos aqui</div>
<div *ngIf="cursos.length == 0">	não existem cursos </div>
<div *ngIf="mostrarCursos"> 	lista de cursos aqui </div>
<div *ngIf="!mostrarCursos"> 	não existem cursos </div>
<button (click)="toogleCursos()"> Mostrar/Esconder cursos </button>
<div [hidden]="!mostrarCursos"> 	lista de cursos aqui </div>
<div [hidden]="mostrarCursos"> 	não existem cursos </div>
<h5>Removendo o * do ngIf e usando ng-template, que é o que o angular faz por baixo dos panos</h5>
<div *ngIf="mostrarCursos">
	<div>Lista de cursos aqui</div>
</div>
<ng-template [ngIf]="mostrarCursos">
	<div>Lista de cursos aqui</div>
</ng-template>	
```
</li>


<li>DIRETIVA ngSwitch: 

```javascript
// .ts
aba: string = 'home';
abaFuncao: string = 'home';
mudaValorDaAbaFuncao(novoValor: string){this.abaFuncao = novoValor}

//html
<div [ngSwitch]="aba">
<p *ngSwitchCase="'home'">Modo home ativado</p>
<p *ngSwitchCase="'mapa'">Modo mapa ativado</p>
<p *ngSwitchCase="'lista'">Modo lista ativado</p>	
<p *ngSwitchDefault>Modo default ativado</p>	
</div>
<div>
<h5>Removendo o * do ngSwitch e usando ng-template, que é o que o angular faz por baixo dos panos</h5>
<div [ngSwitch]="aba">
<ng-template [ngSwitchCase]="'home'" ngSwitchDefault>
<p>Home ativado</p></ng-template>
<ng-template [ngSwitchCase]="'mapa'">
<p>Mapa ativado</p></ng-template>
<ng-template [ngSwitchCase]="'lista'">
<p>Lista ativado</p></ng-template>

//css
.active{ 	font-weight: bold; } 
.flexivel{ 	display: flex; 	justify-content: space-between; }
```
</li>

<li>DIRETIVA ngFor: 

```javascript

// .ts
cursos: string[] = ["Angular", "Java", "CSS"]

//html
<li *ngFor="let curso of cursos, let i = index ">
{{i}} - {{curso}}</li>
<h5>Removendo o * do ngFor e usando o ng-template, que é o que o angular faz por baixo dos panos</h5>
<ng-template ngFor [ngForOf]="cursos" let-curso let-i="index">
<li>{{i}} - {{curso}}</li></ng-template></div>
```
</li>

<li>DIRETIVA ngClass: 

```javascript

// .ts
meuFavorito : boolean = false;
onClick(){		this.meuFavorito = !this.meuFavorito	}

//html
<div [class.corAzul]="!meuFavorito" [class.corVermelho]="meuFavorito" (click)="onClick()" >{{meuFavorito}}
<p>esse texto fica com a cor de fonte e fundo de acordo com a classe</p></div>
<h5>Mesmo código acima, mas usando a diretiva ngClass</h5>
<div [ngClass]="{ 'corAzul':!meuFavorito, 
'corVermelho':meuFavorito }" (click)="onClick()"> {{meuFavorito}}
<p>esse texto fica com a cor de fonte e fundo de acordo com a classe</p></div>

//css
.corAzul{		background-color: blueviolet;}
.corVermelho{		background-color: red;}
```
</li>

<li>DIRETIVA ngStyle: 

```javascript

// .ts
ativo : boolean = false;
tamanhoFonte: number = 10;
mudarAtivo(){ this.ativo = !this.ativo }

//html
<h5>Styles com property binding (style binding)</h5>
<p>ativo: {{ativo}}</p><button
[style.backgroundColor]="ativo ? 'blue' : 'gray'"
[style.color]="ativo ? 'white' : 'black'"
[style.fontWeight]="ativo ? 'bold' : 'normal'"
[style.fontSize]=" tamanhoFonte + 'px'"
(click)="mudarAtivo()">Mudar atributo 'ativo'</button>
<h5>Mesmo código acima, mas usando a diretiva ngStyle</h5>
<button [ngStyle]="{ 'backgroundColor': ativo ? 'blue' : 'gray',
'color': ativo ? 'white' : 'black', 
'fontWeight': ativo ? 'bold' : 'normal',
'fontSize': tamanhoFonte + 'px' }" (click)="mudarAtivo()" >
Mudar atributo 'ativo'</button>
input tamanhoFonte: {{tamanhoFonte}}
<input type="text" [(ngModel)]="tamanhoFonte"> 
```
</li>


</ul>
</ol>
