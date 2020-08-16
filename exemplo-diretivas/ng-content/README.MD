# Exemplo de ng-content para passar componentes para outros componentes com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Informações sobre o que são diretivas:

```javascript
//app.component.html - componente q vai passar conteudo
<app-exemplo-ng-content> conteúdo passado para o componente.	componente diretiva-ngIf<app-diretiva-ngif></app-diretiva-ngif>
</app-exemplo-ng-content>
<app-exemplo-ng-content><div class="titulo">Titulo passado pelo componente</div><div class="corpo">Corpo1 passado pelo componente
</div><div class="corpo">Corpo2 passado pelo componente
</div>restante do conteudo passado pelo componente
</app-exemplo-ng-content>
_________________________________________________________________
//exemplo-ng-content.component.html - componente q vai receber conteudo passado
<p>exemplo-ng-content works!</p><div><div>Titulo do ng-content:
</div><div><b>	conteudo passado vem aqui:</b><ng-content>
</ng-content><b>	fim do conteudo passado</b></div></div>
<div><div><b>apenas titulo passado vem aqui:</b><ng-content select=".titulo"></ng-content><b> fim do apenas titulo passado vem aqui:</b></div><div><b> apenas corpo passado vem aqui: </b>
<ng-content select=".corpo"></ng-content><b> fim do apenas corpo passado vem aqui:</b></div></div>
```
</li>
</ol>