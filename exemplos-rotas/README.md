# Exemplos de Rotas com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<ul>
<li>deve ter cadastrado no index.html um href='/' ou c nome-da-app

```javascript
//index.html
<base href="/">
//ou
<base href="/nome-aplicacao">
```
</li>
<li>o componente da rota é renderizado dentro da tag 'router-outlet' em app.component.html
</li>
<li>o atributo params do activatedRoute é um BehaviorSubject e é por ele q fazemos um subscribe e pegamos o id da rota buscada: 

```javascript 
//curso-detalhe.component.ts
id: number
inscricao: Subscription
ngOnInit(): void {
this.inscricao = this.activatedRoute.params.subscribe(params =>{
	this.id = params['id']})}

ngOnDestroy(){ 		this.inscricao.unsubscribe() 	}

//curso-detalhe.component.html
<p>detalhe id: {{id ? id : ''}}</p>
``` 
</li>
<li>a classe Router é usada p navegar/redirecionar p uma rota, ver se tal rota está ativa etc.: 

```javascript 
//curso-detalhe.component.ts
private router: Router;
this.inscricao = this.route.params.subscribe(params =>{
this.id = params['id']			
this.curso = this.cursosService.getCurso(this.id)
if (this.curso == null){											
this.router.navigate(['/cursos/naoEncontrado', this.id])}})		

//cursos.component.ts
pagina: number
proximaPagina() {
	this.router.navigate(['/cursos'], { queryParams: { 'pagina': ++this.pagina } })}
ngOnInit(): void {
	this.cursos = this.cursosService.getCursos()
this.inscricao = this.route.queryParams.subscribe(queryParams => {	this.pagina = queryParams['pagina'] })}

//cursos.component.html
<button (click)="proximaPagina()">

//app.component.html
<a routerLink="cursos" [queryParams]="{pagina:1}">Cursos</a>
``` 
</li>

<li>p navegar p a rota, usar a diretiva routerLink

```javascript
//html
//routerLink recebe array de parametros. como cursos eh rota raiz, a '/' eh opcional
<a [routerLink]="['cursos', idCurso.value]">Curso com ID</a>
<p>entre com o ID do curso <input type="text" #idCurso>
```
</li>
<li>p colocar uma class css p a rota q estiver ativa, usar a diretiva routerLinkActive="ativa", sendo "ativa" o nome da classe css </li>
</ul>

<li>RouterModule.forRoot - rotas p toda a aplicação no app.module.ts, mas o mais correto é separar por modulos, como no app-routing.module.ts

```javascript
//app.module.ts
//importar o routing de app.routing.ts, caso n seja lazy loading
import { routing } from './app.routing';
imports: [    BrowserModule,		AppRoutingModule,		routing, ]
//app.routing.ts
const APP_ROUTES : Routes = [
{path: '',component: HomeComponent},
{path: 'login',component: LoginComponent},
{path: 'cursos',component: CursosComponent},
{path: 'curso/:id',component: CursoDetalheComponent},
{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},]

export const routing: ModuleWithProviders = RouterModule
.forRoot(APP_ROUTES)
```
</li>

<li>RouterModule.forRoot usando o mais correto, q é separar por modulos, como no app-routing.module.ts:

```javascript
//app.module.ts
//importar o AppRoutingModule
imports: [    BrowserModule,		AppRoutingModule,		routing, ]

//app-routing.module.ts
const APP_ROUTES : Routes = [
{path: '',component: HomeComponent},
{path: 'login',component: LoginComponent},
{path: 'cursos',component: CursosComponent},
{path: 'curso/:id',component: CursoDetalheComponent},
{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},]
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]})
export class AppRoutingModule { }
```
</li>


<li>RouterModule.forChild - módulo de rotas de funcionalidade. Por ex, cursos. n precisa do RouterModule no cursos.module.ts, pq ja esta sendo exportado pelo CursosRoutingModule:

```javascript
//cursos.routing.module.ts
const cursosRoutes : Routes = [		
	{path: '',component: CursosComponent,},
	{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},
	{path: ':id',component: CursoDetalheComponent},]
@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]})
export class CursosRoutingModule { }

//cursos.module.ts
imports: [CommonModule,		
//n precisa do RouterModule, pq ja esta sendo exportado pelo CursosRoutingModule
CursosRoutingModule ],

//app.module.ts
imports: [    BrowserModule,		AppRoutingModule,	CursosModule]
```
</li>


<li>Rotas filhas
<ul>
<li>
toda rota q for hard code, precisa ser avaliada primeiro,
no caso, alunos/novo, pq se n, colide com a rota alunos/:id
</li>
<li>
colocar a tag router-outlet no AlunosComponent
</li>
<li>
colocar o ALunosModule no app.module.ts ou realizar lazy loading, como mais p baixo da pagina
</li>
<li>como estamos trabalhando c rotas filhas, precisamos
passar apenas aluno.id no routerLink
</li>
</ul>

```javascript
//alunos.routing.module.ts
const alunosRoutes = [
{path: 'alunos', component: AlunosComponent, 
children: [
{path: 'novo', component: AlunoFormComponent},
{path: ':id', component: AlunoDetalheComponent,},
{path: ':id/editar', component: AlunoFormComponent,},]
@NgModule({
imports: [RouterModule.forChild(alunosRoutes)],
exports: [RouterModule]})
export class AlunosRoutingModule{}

//alunos.module.ts
@NgModule({
declarations:[AlunosComponent,AlunoFormComponent,AlunoDetalheComponent],
imports: [CommonModule, AlunosRoutingModule, FormsModule],
exports: [],
providers: [AlunosService, AlunosDeactivateGuard, AlunoDetalheResolver],})
export class AlunosModule{}

//app.module.ts
imports [AlunosModule]

//alunos.component.html
<!-- como estamos trabalhando c rotas filhas, precisamos
passar apenas aluno.id no routerLink -->
<a [routerLink]="[aluno.id]">{{aluno.nome}}</a>

//.ts
this.route.navigate(['/alunos', this.aluno.id, 'editar'])
```
</li>
</ol>
