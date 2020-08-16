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

<li>DIRETIVAS:
<ul>
<li>DIRETIVA ngIf: </li>
<ul>
<li>[hidden] - como alternativa - é menos custoso usar o hidden caso o custo de criar a árvore de elementos seja grande. obs: hidden não deve ser usado qdo usuário não pode ver algum item.
</li>
<li>
A origem da tag <template> é a especificação padrão Web Components que está sendo implementada nos browsers. http://webcomponents.org/articles/introduction-to-template-element
</li>
</ul>

```javascript
// .ts
cursos: string[] = [];
mostrarCursos: boolean = true;
toogleCursos(){ this.mostrarCursos = !this.mostrarCursos}
//html
/*
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
*/
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
