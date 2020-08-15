# Exemplos com Tipos de Data Binding com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b>](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)


## Anotações:

### INTERPOLAÇÃO:
<ol>
<li>pode usar p contas, operações lógicas:

```javascript
//arquivo html
<p>String renderizada com interpolação (quem também é uma forma de property binding): {{ url }}</p>
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
<li>acrescentando o class binding e só mostra a class, se a operação lógica  {{ classe.value == 'alert-success' }} resultar em true:

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
<li>property binding com estilo de classe:

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
onMudouValor(evento){console.log(evento);console.log(evento.novoValor);}
//html
<button (click)="metodoClicar()">Clique</button>
<!--por baixo dos panos o angular transforma o de baixo no de cima-->
<button on-click="metodoClicar()">Clique</button>
<input type="text" name="" id="" (keyup)="metodoDigitar($event)"
(keyup.enter)="salvarValor($event.target.value)"
(blur)="salvarValor(campoInput.value)" #campoInput>
<p>valor atual: {{valorQueFoiDigitado}}</p>
<p>valor salvo: {{valorSalvo}}</p>
<span (mouseover)="onMouseOverOut()" (mouseout)="onMouseOverOut()" [class.highlight] = "isMouseOver" >Passe o mouse sobre mim</span></div>
```
</li>
</ol>