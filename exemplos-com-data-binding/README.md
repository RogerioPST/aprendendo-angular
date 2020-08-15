# Exemplos com Tipos de Data Binding com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)


## Anotações:

### INTERPOLAÇÃO:
<ol>
<li>pode usar p contas, operações lógicas:

```javascript
<p>String renderizada com interpolação (quem também é uma forma de property binding): {{ url }}</p>
<p>Resultado de 1 + 1 : {{ 1+1 }}</p>
<p>Resultado de 1 + 1 não é: {{ 1+1+ getValor() }}</p>
<p>Curso de angular: {{ cursoAngular && getCurtirCurso()}}</p>
<img src="{{urlImagem}}" alt="">

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


