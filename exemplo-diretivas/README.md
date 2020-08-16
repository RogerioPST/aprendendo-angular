# ExemploDiretivas com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)

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
<li>DIRETIVA ngIf: 
<ul>
<li>hidden como alternativa -é menos custoso usar o hidden caso o custo de criar a árvore de elementos seja grande.
</li>
<li>
A origem da tag <template> é a especificação padrão Web Components que está sendo implementada nos browsers. [(http://webcomponents.org/articles/introduction-to-template-element)]
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
<button (click)="toogleCursos()">Mostrar/Esconder cursos</button>
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
</ol>
