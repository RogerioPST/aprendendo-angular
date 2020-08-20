# Exemplos de Rotas com Angular
- [x] - Anotações
- [ ] - [olhar as anotações sobre <b>MÓDULOS</b> na pasta modulos](https://github.com/RogerioPST/aprendendo-angular/blob/master/meu-primeiro-projeto/modulos/README.MD)
- [ ] - [olhar as anotações sobre <b>ng-content</b> para passar componentes para outros componentes](https://github.com/RogerioPST/aprendendo-angular/blob/master/exemplo-diretivas/ng-content/README.MD)

## Anotações:
<ol>
<li>Info gerais:
<ul>
<li>deve ter cadastrado no index.html um base href='/' ou c nome-da-app

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

</li>
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

<li>Carregamento Lazy Loading / Sob Demanda. Passos:
<ol>
<li>colocar no app.routing.module.ts a configuração de path com loadChildren.
"
{path: 'cursos', loadChildren: 'app/cursos/cursos.module#CursosModule'}
"
</li>
<li>retirar o import de CursosModule do app.module.ts ou de qq outro arquivo da aplicação
</li>
<li>no cursos.routing.module.ts, mudar o path 'cursos' p '', pois o path 'cursos' ja esta no loadChildren
</li>
<li>p certificar q funcionou, verificar na aba Network do console do navegador, se ao clicar na aba Cursos, vai ser carregado um arquivo especifico de Cursos.
</li>
</ol>

```javascript
//app.routing.module.ts
const appRoutes : Routes = [
{path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)}]

//cursos.routing.module.ts
const cursosRoutes : Routes = [		
{path: '',component: CursosComponent,},
{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},
{path: ':id',component: CursoDetalheComponent},]

//app.module.ts
imports: [ 	BrowserModule,
	AppRoutingModule,],
```
</li>

<li>Login, Guarda de rotas (AuthGuard), CanLoad e CanActivate:
<ol>
<li>criar como serviço e colocar o AuthGuard na pasta guards e renomear p auth.guard.ts.
</li>
<li>colocar o AuthGuard (Guarda de autenticação) como providers de app.module.ts e aplicar o canActivate: [AuthGuard] p a rota q n se quiser q o usuario veja, se n estiver logado.
</li>
<li>junto com AuthGuard, é necessário o CanLoad, pois, mesmo com o AuthGuard, os modulos de ALunos e Cursos, q estão com lazy loading (arquivo .js) são carregados, msm sem o usuario ter acesso e é p isso q é usado o CanLoad.
</li>
<li>p permitir acesso a uma rota ou n, implementar a interface 
canActivate e tb colocar o canActivate no app.routing.module e
qq routing q quisermos travar
</li>
<li>no cursos.routing.module.ts, mudar o path 'cursos' p '', pois o path 'cursos' ja esta no loadChildren
</li>
<li>p certificar q funcionou, verificar na aba Network do console do navegador, se ao clicar na aba Cursos, vai ser carregado um arquivo especifico de Cursos.
</li>
</ol>

```javascript

//login.component.ts
export class LoginComponent implements OnInit {
usuario: Usuario = new Usuario()
constructor(private authService: AuthService) { }
ngOnInit(): void {
this.usuario.nome = 'u@e'
this.usuario.senha = '123'}
fazerLogin(usuario: Usuario){				
this.authService.fazerLogin(usuario)	}}

//login.component.html
<input [(ngModel)]="usuario.nome" type="text">
<label for="usuario">Usuário</label>
<input [(ngModel)]="usuario.senha" type="password">
<label for="senha">Senha</label>
<button type="submit" (click)="fazerLogin(usuario)">Login</button>

//app.module.ts
providers: [AuthService, AuthGuard, CursosGuard, AlunosGuard],
bootstrap: [AppComponent]
})
export class AppModule { }

//Usuario.ts
export class Usuario{
	nome: string;
	senha: string;}

//app-routing.module.ts
const appRoutes : Routes = [
{path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
canActivate: [AuthGuard], canLoad: [AuthGuard]	},
{path: 'alunos', loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
canActivate: [AuthGuard], canLoad: [AuthGuard]},
{path: 'login',component: LoginComponent},	
{path: 'home',component: HomeComponent, canActivate:[AuthGuard]},
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: '**',component: PaginaNaoEncontradaComponent, canActivate:[AuthGuard]},]
@NgModule({
imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
exports: [RouterModule]})
export class AppRoutingModule { }

//cursos.routing.module.ts
const cursosRoutes : Routes = [		
{path: '',component: CursosComponent,},
{path: 'naoEncontrado/:id',component: CursoNaoEncontradoComponent},
{path: ':id',component: CursoDetalheComponent},]

//auth.service.ts
export class AuthService {
private usuarioAutenticado: boolean = false
mostrarMenuEmitter = new EventEmitter<boolean>()	
constructor(private router: Router) { }
usuarioEstaAutenticado(){
return this.usuarioAutenticado}
fazerLogin(usuario: Usuario){
if (usuario.nome == 'u@e' && usuario.senha == '123'){
this.usuarioAutenticado = true
this.mostrarMenuEmitter.emit(true)
this.router.navigate(['/'])
} else{
this.usuarioAutenticado = false
this.mostrarMenuEmitter.emit(false)
}	}}

//auth.guard.ts
export class AuthGuard implements CanActivate, CanLoad {
constructor(private authService: AuthService,
private router: Router) { }
canLoad(route: Route, 
segments: UrlSegment[]
): boolean | Observable<boolean> | Promise<boolean> {
return this.verificarAcesso()}
private verificarAcesso(){
if (this.authService.usuarioEstaAutenticado()){
return true} 
this.router.navigate(['/login'])
return false}	
canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean{
return this.verificarAcesso()}}
```
</li>

<li>Guarda de Rotas -  CanActivateChild - usar p qdo eu n quiser q um usuario tenha acesso p editar os Alunos ou algum outro formulário:
<ol>
<li>criar o arquivo alunos.guard.ts, q eh mto parecido c auth.guard.ts.
</li>
<li>colocar o AlunosGuard como providers de app.module.ts e aplicar o canActivateChild: [AlunosGuard] p a rota q n se quiser q o usuario tenha acesso.
</li>
<li>como o ALunosGuard ja esta c provider no app.module, n precisa fazer mais nd, mas caso quisessemos, poderiamos mover o arquivo p a pasta alunos, declarar como provider no alunos.module e ficar td somente dentro do escopo da pasta alunos.
</li>
<li>o ALunosGuard pode ser colocado no app.routing.module.ts (mais geral e será chamado a partir da chamada na rota '/alunos') ou no alunos.routing.module.ts, pois, somente serah chamado se eu for em uma das rotas abaixo (children)	
</li>
<li>poderia injetar um serviço aqui, igual no AuthGuard, chamar esse serviço e ele vai ate o servidor e passamos o usuario logado e um codigo p identificar a rota e la no servidor vamos verificar se o usuario tem acesso ou n. entao c esse retorno de observable de boolean, o angular ja sabe q vc fez uma chamada assincrona e q foi ao servidor e verificou.
</li>
</ol>

```javascript
//alunos.guard.ts
export class AlunosGuard implements CanActivateChild {
constructor(private authService: AuthService,
private router: Router) { }
canActivateChild(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
): Observable<boolean> |Promise<boolean> | boolean{
if (state.url.includes('edit')){
alert('usuario sem acesso')
return false
}
return true}}

//app.routing.module.ts
{path: 'alunos', loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
canActivate: [AuthGuard],
//canActivateChild:[AlunosGuard]}

//alunos.routing.module.ts
const alunosRoutes = [
{path: '', component: AlunosComponent, 
canActivateChild:[AlunosGuard],
children: [
{path: 'novo', component: AlunoFormComponent},
{path: ':id', component: AlunoDetalheComponent,
resolve:{alunoResolver: AlunoDetalheResolver}
},
{path: ':id/editar', component: AlunoFormComponent,
canDeactivate: [AlunosDeactivateGuard]
},			]},]

//app.module.ts
providers: [AlunosGuard],
```
</li>

<li>Guarda de Rotas - CanDeactivate:
<ol>
<li>usar p as rotas em q eu quiser avisar o usuario, q se ele sair daquela pagina de preenchimento do formulario, ele perderá todos os dados cadastrados e p permitir um novo submit de dados ao servidor, caso dê algum erro na chamada ao servidor
</li>
<li>criar o arquivo AlunosDeactivateGuard como serviço e renomear p esse padrao e colocá-lo na rota q se deseja ter o comportamento do item acima.
</li>
<li>caso queira reaproveitar esse AlunosDeactivate, criar uma interface generica (IFormCanDeactivate) p ser usada por outros 
componentes e implementar essa interface em ALunosFormComponent e seu metodo.
</li>
</ol>

```javascript
//iFormCanDeactivate
export interface IFormCanDeactivate{
podeDesativar()}

//aluno.form.component.ts
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {	
private formMudou : boolean = false	//informa alteração no form
//metodo presente na interface IFormCanDeactivate.
podeDesativar() { return this.podeMudarRota() }
podeMudarRota(){
if (this.formMudou){
return confirm('Tem certeza q deseja sair dessa pagina? Os dados do formulario serao perdidos..')
}
return true}

//alunos.deactivate.guard.ts
@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate>{
canDeactivate( component: IFormCanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, 
nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
console.log('guarda de desativacao - testar, por ex, indo em editar dos alunos e estando no editar, tentar clicar em Cursos, vai disparar esse console.log:' )
return component.podeDesativar()}}

//alunos.module.ts
providers: [AlunosService, AlunosDeactivateGuard]

//alunos.routing.module.ts
{path: ':id/editar', component: AlunoFormComponent, 
canDeactivate: [AlunosDeactivateGuard]
},		
```
</li>

<li>Guarda de Rotas - Resolve:
<ol>
<li>pode ser q eu queira carregar a info do aluno antes de o componente ser criado, inicializado e renderizado na tela
</li>
<li>criar o arquivo AlunoDetalheResolver e coloca-lo como provider no alunos.module.ts
</li>
<li>informar a rota q estamos resolvendo o objeto Aluno antes de carregar o componente
</li>
<li>'alunoResolver' é o nome q será usado no AlunoDetalheComponent.
</li>
<li>aluno é carregado antes no Resolver; diferente de sem o Resolver, em que aluno só era carregado no ngOnInit do AlunoDetalheComponent
<ul>
<li>1º- passa pelo AuthGuard</li>
<li>2º- passa pelo AlunosGuard - guarda de rota filha</li>
<li>3º- passa pelo AlunosDetalheResolver</li>
<li>4º- passa pelo ngOnInit do ALunoDetalheComponent</li>
</ul>
</li>
</ol>

```javascript
//aluno-detalhe.resolver.ts
@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno>{
constructor(private alunosService: AlunosService){}
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
): Aluno | Observable<Aluno> | Promise<Aluno> {
let id = route.paramMap.get('id')
return this.alunosService.getAluno(parseInt(id))}}

//aluno-detalhe.component.ts
export class AlunoDetalheComponent implements OnInit {
inscricao: Subscription
aluno: Aluno
constructor(private route: Router, private activatedRoute: ActivatedRoute, private alunosService: AlunosService) { }	
editarContato(){
console.log('this id', this.aluno.id)
this.route.navigate(['/alunos', this.aluno.id, 'editar'])
/* this.route.navigateByUrl(`/alunos/${this.aluno.id}/edit`, {
state: { aluno: this.aluno }
})*/}
ngOnInit(): void {
/* 	this.inscricao = this.activatedRoute.params.subscribe(params =>{ this.aluno = this.alunosService.getAluno(params['id']) }) 
codigo acima sem usar Resolver e codigo abaixo usando Resolver	
*/		
this.inscricao = this.activatedRoute.data.subscribe((informacoes: {alunoResolver: Aluno}) =>{
// informacoes.aluno (alunoResolver eh o nome q coloquei no 
//alunos.routing.module)
this.aluno = informacoes.alunoResolver})}

//alunos.module.ts
providers: [AlunosService, AlunosDeactivateGuard, AlunoDetalheResolver]

//alunos.routing.module.ts
{path: ':id', component: AlunoDetalheComponent,
resolve:{alunoResolver: AlunoDetalheResolver}}

//aluno.ts
export class Aluno{
constructor(
 id: number,
 nome: string,
 email: string
){}}
```
</li>

<li>definindo rota padrão e wildcard (rota n encontrada) e Estilo de url: HTML5 ou usando #, pois pode ser q o backend n reconheça a rota ou qdo estou tentando acessar uma url p chamada ajax:

```javascript
//app.routing.module.ts
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: '**',component: PaginaNaoEncontradaComponent, canActivate:[AuthGuard]},

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
</li>
</ol>
