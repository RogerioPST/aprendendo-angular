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
<li>p verificar o q está inválido no formulário, chamar o metodo <b>verificaValidacoesForm(formGroup: FormGroup)</b> passando por todos os campos, inclusive os filhos dos campos, como filhos de endereço</li>
<li>tanto cidades, como estados, cargos etc. são trazidos pelo serviço <b>DropdownService</b></li>
<li>usar o pipe <b>async</b>, caso os valores venham do servidor</li>
<li>o comparator nos cargos eh usado p qdo queremos passar e verificar o objeto inteiro e n somente o id. Usa-se tb a diretiva <b>ngValue</b> e <b>compareWith</b> </li>
<li>Combobox Múltiplo - <b>(Select Multiple)</b> p o campo tecnologias </li>
<li>p campos do tipo 'aceito termo', usar a validação de expressao regular ('pattern') com Validators.pattern('true')</li>

<li>
formBuilder.array é usado tanto p checkbox dinamicos como formulario aninhados: this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1)) junto c a diretiva formArrayName="frameworks" 
<ul>
<li>Validação customizada: 
1º - FormValidations.requiredMinCheckbox(1)
2º - FormValidations.cepValidator 
3º - confirmarEmail:FormValidations.equalsTo('email'), 
4º - Validação assincrona: email: this.validarEmail.bind(this), formulario.get('email').status === 'PENDING': 
5º - validação customizada padronizada de msg de erro


```javascript
//error-msg.component.ts
export class ErrorMsgComponent implements OnInit {
@Input() control: FormControl
@Input() label: string
get errorMessage(){
for (const propertyName in this.control.errors){
console.log('error-msg.component.ts', propertyName)
if (this.control.errors.hasOwnProperty(propertyName) &&
this.control.touched){
return FormValidations.getErrorMsg(this.label, propertyName, 
this.control.errors[propertyName])}}
return null}}

//data-form.component.ts
return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1)) 
cep: [null, [Validators.required, FormValidations.cepValidator]],
confirmarEmail: [null, [FormValidations.equalsTo('email')]],
email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],

validarEmail(formControl: FormControl){
	return this.verificarEmailService.verificarEmail(formControl.value)
		.pipe(map(emailExiste => emailExiste ? {emailInvalido: true} : null))
}

//form.validations.ts
export class FormValidations {
static requiredMinCheckbox(min = 1){
const validator = (formArray: FormArray) =>{
const totalChecked = formArray.controls
.map(v => v.value)
.reduce((total, current) => current ? total + current : total, 0)
return totalChecked >= min ? null : {required: true}}
return validator

static cepValidator(control: FormControl){
const cep = control.value
if (cep && cep !== ''){
const validacep = /^[0-9]{5}(-)*[0-9]{3}$/;
return validacep.test(cep) ? null : {cepInvalido: true}}}

static equalsTo(otherField: string){
const validator = (formControl: FormControl) =>{
if (otherField == null){
throw new Error('é necessario informar um campo')
}
//quer dizer q o formulario ainda n esta pronto/totalmente carregado; q o angular vai exec essa validacao desde qdo renderizar na tela
if (!formControl.root || !(<FormGroup>formControl.root).controls{
//com o root, acessamos a raiz do formulario
return null}
const field = (<FormGroup> formControl.root).get(otherField)
if (!field){
throw new Error('é necessario informar um campo válido')}

if (field.value !== formControl.value){
//pode retornar um objeto com qualquer mensagem				
return { equalsTo: otherField}}
return null}
return validator}

static getErrorMsg(fieldName: string, validatorName: string,
validatorValue?: any){
const config ={
'required': `${fieldName} é obrigatório!`,
'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
'cepInvalido': 'CEP inválido',
'emailInvalido': 'Email inválido',
'equalsTo': 'Não são iguais',}
return config[validatorName]}

//data-form.component.html
formulario.get('endereco.cep').hasError('cepInvalido')"
formulario.get('confirmarEmail').hasError('equalsTo')" 

<app-campo-control-erro 
[mostrarErro]="formulario.get('email').status === 'PENDING'" 
msgErro="Validando email...">
</app-campo-control-erro>
<app-campo-control-erro 
[mostrarErro]="formulario.get('email').status === 'VALID'" 
msgErro="email validado..."></app-campo-control-erro>
<app-campo-control-erro 
[mostrarErro]="formulario.get('email').hasError('emailInvalido') 
msgErro="email jah cadastrado">
</app-campo-control-erro>

<app-error-msg [control]="formulario.get('nome')"
label="Nome"></app-error-msg>

//verificarEmail.json  
{ "emails": [ { "email": "email@email.com"},{ "email": "email1@email.com"}, { "email": "email2@email.com"},
{ "email": "email3@email.com"}, { "email": "email4@email.com"},
{ "email": "email5@email.com"} ]}

//verifica-email.service.ts
export class VerificaEmailService {
constructor(private htp: HttpClient) { }
verificarEmail(email: string){
return this.htp.get('assets/dados/verificarEmail.json')
.pipe(
//delay de segundos p n bombardear o servidor e causar deny of service				
delay(2000),
map((dados: {emails: any[]}) => dados.emails),
tap(console.log),
map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
tap(console.log),
map((dados: any[]) => dados.length > 0),
tap(console.log),)}}
```
</li>
</ul>

```javascript
//data-form.component.ts
//o codigo abaixo é usado mto c redux no angular p performance usando imutabilidade;
//faz uma copia dos valores do formulario
let copiaDosValoresDoFormulario = Object.assign({}, this.formulario.value)
//faço outra copia, mas dessa vez, faço replace apenas dos frameworks
copiaDosValoresDoFormulario = Object.assign(copiaDosValoresDoFormulario, {
frameworks: copiaDosValoresDoFormulario.frameworks
.map((v, i) => v ? this.frameworks[i] : null)
.filter(v => v !== null)
})
```
</li>
</ul>

```javascript

//data-form.component.css
.ng-invalid.ng-touched:not(form){
border: 2px solid red;}
.ng-invalid.ng-touched:not(form)::before{
border: 2px solid red;
content: 'X';}

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

//consulta-cep.service.ts
export class ConsultaCepService {
constructor(private http: HttpClient) { }
consultaCEP(cep: string){		
cep = cep.replace(/\D/g, '')
if (cep != '') {
let validacep = /^[0-9]{8}$/
if (validacep.test(cep)) {				
return this.http.get(`//viacep.com.br/ws/${cep}/json`)}}
//sempre retorna algo. caso invalido, retorna vazio
return of({})}}

//estado-br.ts
export class EstadoBr {
	id: number
	sigla: string
	nome: string
}

//cidade.ts
export interface Cidade{
	id: number
	nome: string
	estado: number}

//dropdown.service.ts
export class DropdownService {
constructor(private http: HttpClient) { }
getEstadosBr(){
return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json')}
getCidades(idEstado: number){
return this.http.get<Cidade[]>('assets/dados/cidades.json')		
.pipe(map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado)))}
getCargos(){return [
{nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
{nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
{nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},]}
getTecnologias(){return [
{nome: 'Java', desc: 'Java d'},{nome: 'PHP', desc: 'PHP d'},
{nome: 'CSS', desc: 'CSS d'},{nome: 'Ruby', desc: 'Ruby d'},]}

getNewsletter(){return [
{valor: 's', desc: 'Sim'},{valor: 'n', desc: 'Não'},]}}
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
