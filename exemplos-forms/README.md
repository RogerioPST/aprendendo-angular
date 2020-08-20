# Exemplos de Forms com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Info gerais:
</li>
<li>
DATA DRIVEN FORM / FORMULARIOS REATIVOS
<ul>
<li>importar o ReactiveFormsModule de @angular/forms</li>
<li>importar o Validators de @angular/forms, pois todas as validações de formularios padrão do angular estão nele. Por ex: Validators.required, Validators.minLength(2)</li>
<li>p criar os formularios, a melhor forma é atraves de FormBuilder</li>
<li>p agrupar campos, usar endereco: this.formBuilder.group no componente e a diretiva formGroupName="endereco" no html </li>
<li>p sincronizar o formulario do componente p o html, usar a diretiva formGroup="formulario" na tag form.</li>
<li>p chamar o metodo de onSubmit no componente qdo o form for submetido, usar a diretiva ngSubmit="onSubmit()" na tag form</li>
<li>p associar um input do form com o componente, usar a diretiva formControlName="graduacao" na tag input, select etc.
</li>
<li>o formulario tem o metodo reset() p limpar os campos
</li>
<li>p reaproveitar o componente de debug e de erro, coloca-los em modulo compartilhado: SharedModule</li>
</ul>

```javascript
//shared.module.ts
@NgModule({
declarations: [FormDebugComponent,CampoControlErroComponent],
imports: [CommonModule,HttpClientModule,FormsModule ],
exports: [FormDebugComponent,CampoControlErroComponent,],
})
export class SharedModule { }

//data-form.module.ts
@NgModule({declarations: [DataFormComponent],
imports: [CommonModule,
ReactiveFormsModule,		
HttpClientModule]})
export class DataFormModule { }
```
</li>





<li>validações:
<ul>
<li>o angular aplica as classes tanto no formulario como em cada campo: form-control, ng-dirty/ng-pristine (valor mudou ou n), ng-(un)touched (campo teve foco ou nao), ng-(in)valid (controle valido ou n)

```javascript
//.css
.ng-invalid.ng-touched:not(form){
	border: 2px solid red;}
.ng-valid.ng-touched:not(form){
	border: 2px solid green;}
```
</li>
<li>HTML 5: https://www.the-art-of-web.com/html/html5-form-validation/
</li>
<li>criar um avariavel local de template, por ex, #nome.
p ver as classes aplicadas a ela, fazer {{nome.className}}
</li>
<li>a diferença entre o setValue no form e o patchValue é q com patchValue vai soh atualizar aquilo q eu quero alterar,
ao contrario do setValue q precisa preencher todos os campos
</li>
</ul>
 
</li>
<li>
TEMPLATE FORM - por baixo dos panos, o Angular cria um form reativo (controls)
</li>
<li>
Dica tanto p TEMPLATE DRIVEN FORM como DATA DRIVEN FORM p verificar dados do FORMULARIO no HTML com JSON:

```javascript
//template-form.component.html
<app-form-debug [form]="formulario"></app-form-debug>

//form-debug.component.ts
@Component({selector: 'app-form-debug',
templateUrl: './form-debug.component.html',
styleUrls: ['./form-debug.component.css']})
export class FormDebugComponent implements OnInit {
@Input() form

//app-form-debug ou form.debug.component.html
<div style="margin-top: 20px;" *ngIf="form">
<div>Detalhes do formulario</div>
<pre>Form válido: {{ form.valid }}</pre>
<pre>Form submetido: {{ form.submitted }}</pre>
<pre>Valores: {{ form.value | json }}</pre>
```
</li>
</ol>
