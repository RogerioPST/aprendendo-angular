# MeuPrimeiroProjeto com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)


## Anotações:
<ol>
<li>instalando typescript global:  

```javascript
npm i -g typescript
```
</li>
<li>instalando angular/cli global: 

```javascript
npm i -g @angular/cli
```
</li>
<li>
comandos via angular/cli:
<ul>
<li>versão do angular/cli:

```javascript
ng version
```
</li>
<li>cria o projeto com a angular/cli:

```javascript
ng new primeiro-projeto
//ou
mkdir primeiro-projeto
cd primeiro-projeto
ng init
```
</li>
<li>cria o projeto com pré-processador SASS/LESS/STYLUS com a angular/cli:

```javascript
ng new primeiro-projeto --style=sass
//ou
ng new primeiro-projeto --style=less
//ou
ng new primeiro-projeto --style=stylus
//ou caso jah tenha o projeto
ng set defaults.styleExt scss
ng set defaults.styleExt less
ng set defaults.styleExt styl
```
</li>
<li>starta o projeto:

```javascript
ng serve --port 4201 --live-realod-port 49153
```
</li>
<li>cria o componente com a angular/cli e atualiza o app.module.ts com o nome desse componente nas 'declarations'

```javascript
ng g c meu-primeiro-componente
```
</li>
<li>cria o módulo com a angular/cli'

```javascript
ng g m cursos
```
</li>
<li>cria o serviço com a angular/cli'

```javascript
ng g s cursos
```
</li>
<li>cria a diretiva com a angular/cli'

```javascript
ng g directive minha-diretiva
```
</li>
<li>cria o pipe com a angular/cli'

```javascript
ng g pipe meu-pipe
```
</li>
<li>cria a classe com a angular/cli'

```javascript
ng g class minha-classe
```
</li>
<li>cria a interface com a angular/cli'

```javascript
ng g interface minha-interface
```
</li>
<li>cria o ENUM com a angular/cli'

```javascript
ng g enum meu-enum
```
</li>
<li>verifica falta de boas práticas (lint) com a angular/cli'

```javascript
ng lint
```
</li>
<li>roda arquivos de teste (.spec.ts) com a angular/cli'

```javascript
ng test
```
</li>
<li>roda testes de integração (end to end/e2e) com a angular/cli'

```javascript
ng e2e
```
</li>
<li>4 opções p gerar build com a angular/cli'

```javascript
ng build 
ng build --dev
ng build --dev --e=dev
ng build --target=development --environment=dev
```
</li>
</ul>
</li>
